import { NextRequest } from "next/server";
import { assertEnrichmentAdmin, ForbiddenError } from "@/lib/enrichment/admin-auth";
import { apiSuccess, apiError } from "@/lib/enrichment/api-response";
import { getEnrichmentStore } from "@/lib/enrichment/stores";
import { UnauthorizedError } from "@/lib/enrichment/auth";
import { creditAccount } from "@/lib/enrichment/ledger";
import { StoreLedgerBridge } from "@/lib/enrichment/stores/ledger-bridge";
import { z } from "zod";

export const dynamic = "force-dynamic";

const GrantCreditsSchema = z.object({
  amount: z.number().int().positive("Grant amount must be a positive integer."),
  reason: z.string().min(1, "Reason is required."),
  idempotencyKey: z.string().optional(),
});

export async function POST(
  request: NextRequest,
  { params }: { params: { accountId: string } }
) {
  try {
    // Assert user is an authorized admin
    const adminContext = await assertEnrichmentAdmin(request);

    const store = getEnrichmentStore();
    const { accountId } = params;

    // Parse and validate request body
    const body = await request.json();
    const parsed = GrantCreditsSchema.safeParse(body);
    if (!parsed.success) {
      return apiError("INVALID_REQUEST", "Invalid credit grant request.", 400, {
        issues: parsed.error.issues,
      });
    }

    const { amount, reason, idempotencyKey: clientIdempotencyKey } = parsed.data;
    const idempotencyKey = clientIdempotencyKey || `admin-grant-${accountId}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

    const ipAddress = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
    const userAgent = request.headers.get("user-agent") || "unknown";

    // Run atomically inside a transaction block
    const result = await store.runInTransaction(async (txStore) => {
      // 1. Verify target account exists
      const account = await txStore.accounts.getAccountById(accountId);
      if (!account) {
        throw new Error("ACCOUNT_NOT_FOUND");
      }

      // 2. Perform credit debit/credit via ledger service bridge
      const ledgerBridge = new StoreLedgerBridge(txStore);
      const ledgerResult = await creditAccount(ledgerBridge, {
        accountId: account.id,
        amount,
        txType: "BUY_CREDITS",
        idempotencyKey,
        description: `Admin manual credit grant: ${reason}`,
      });

      // 3. Write admin action audit log
      await txStore.audit.createAuditLog({
        accountId: account.id, // Log against target account for user history visibility
        action: "ADMIN_CREDIT_GRANT",
        ipAddress,
        userAgent,
        metadata: {
          targetAccountId: accountId,
          amount,
          reason,
          adminAccountId: adminContext.accountId,
          idempotencyKey,
          isIdempotentReplay: ledgerResult.isIdempotentReplay,
        },
      });

      return {
        newBalance: ledgerResult.newBalance,
        isIdempotentReplay: ledgerResult.isIdempotentReplay,
        ledgerEntryId: ledgerResult.ledgerEntry.id,
      };
    });

    return apiSuccess({
      accountId,
      amount,
      newBalance: result.newBalance,
      isIdempotentReplay: result.isIdempotentReplay,
      ledgerEntryId: result.ledgerEntryId,
      message: result.isIdempotentReplay
        ? "This credit grant was already processed (idempotent replay)."
        : `Successfully granted ${amount} credits.`,
    });
  } catch (err) {
    if (err instanceof UnauthorizedError) {
      return apiError("UNAUTHORIZED", err.message, 401);
    }
    if (err instanceof ForbiddenError) {
      return apiError("FORBIDDEN", err.message, 403);
    }
    if (err instanceof Error && err.message === "ACCOUNT_NOT_FOUND") {
      return apiError("ACCOUNT_NOT_FOUND", `Account with ID ${params.accountId} was not found.`, 404);
    }
    console.error(`[POST /api/enrichment/admin/accounts/${params.accountId}/credits] Error:`, err);
    return apiError("INTERNAL_ERROR", "An internal error occurred.", 500);
  }
}
