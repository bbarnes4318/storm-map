import { NextRequest } from "next/server";
import { assertEnrichmentAdmin, ForbiddenError } from "@/lib/enrichment/admin-auth";
import { apiSuccess, apiError } from "@/lib/enrichment/api-response";
import { getEnrichmentStore } from "@/lib/enrichment/stores";
import { UnauthorizedError } from "@/lib/enrichment/auth";
import { CreditTransactionType } from "@/lib/enrichment/schemas";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    // Assert user is an authorized admin
    await assertEnrichmentAdmin(request);

    const store = getEnrichmentStore();
    const searchParams = request.nextUrl.searchParams;

    const accountId = searchParams.get("accountId") || undefined;
    const txTypeStr = searchParams.get("txType");
    const txType = txTypeStr ? (txTypeStr as CreditTransactionType) : undefined;
    
    const limitParam = parseInt(searchParams.get("limit") || "50", 10);
    const limit = isNaN(limitParam) ? 50 : Math.min(limitParam, 100);
    const offsetParam = parseInt(searchParams.get("offset") || "0", 10);
    const offset = isNaN(offsetParam) ? 0 : offsetParam;

    // Fetch ledger entries
    const entries = await store.ledger.listLedgerEntries({
      accountId,
      txType,
      limit,
      offset,
    });

    // Resolve emails for the accounts referenced in ledger entries
    const uniqueAccountIds = Array.from(new Set(entries.map((e) => e.accountId)));
    const emailMap = new Map<string, string>();
    
    await Promise.all(
      uniqueAccountIds.map(async (id) => {
        const acc = await store.accounts.getAccountById(id);
        if (acc) {
          emailMap.set(id, acc.email);
        }
      })
    );

    return apiSuccess({
      ledgerEntries: entries.map((entry) => ({
        id: entry.id,
        accountId: entry.accountId,
        email: emailMap.get(entry.accountId) || "unknown@storm-map.local",
        amount: entry.amount,
        txType: entry.txType,
        idempotencyKey: entry.idempotencyKey,
        referenceId: entry.referenceId,
        description: entry.description,
        createdAt: entry.createdAt.toISOString(),
      })),
    });
  } catch (err) {
    if (err instanceof UnauthorizedError) {
      return apiError("UNAUTHORIZED", err.message, 401);
    }
    if (err instanceof ForbiddenError) {
      return apiError("FORBIDDEN", err.message, 403);
    }
    console.error("[GET /api/enrichment/admin/ledger] Error:", err);
    return apiError("INTERNAL_ERROR", "An internal error occurred.", 500);
  }
}
