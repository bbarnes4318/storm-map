import { NextRequest } from "next/server";
import { assertEnrichmentAdmin, ForbiddenError } from "@/lib/enrichment/admin-auth";
import { apiSuccess, apiError } from "@/lib/enrichment/api-response";
import { getEnrichmentStore } from "@/lib/enrichment/stores";
import { UnauthorizedError } from "@/lib/enrichment/auth";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: { accountId: string } }
) {
  try {
    // Assert user is an authorized admin
    await assertEnrichmentAdmin(request);

    const store = getEnrichmentStore();
    const { accountId } = params;

    // Resolve Account Details
    const account = await store.accounts.getAccountById(accountId);
    if (!account) {
      return apiError("ACCOUNT_NOT_FOUND", `Account with ID ${accountId} was not found.`, 404);
    }

    // Fetch Associated History Sub-lists (limit 50, sorted newest first)
    const [ledgerEntries, unlocks, auditLogs] = await Promise.all([
      store.ledger.listLedgerEntries({ accountId, limit: 50 }),
      store.unlocks.listUnlocks({ accountId, limit: 50 }),
      store.audit.listAuditLogs({ accountId, limit: 50 }),
    ]);

    return apiSuccess({
      account: {
        accountId: account.id,
        email: account.email,
        authProvider: account.authProvider,
        authUserId: account.authUserId,
        creditBalance: account.creditBalance,
        createdAt: account.createdAt.toISOString(),
        updatedAt: account.updatedAt.toISOString(),
      },
      ledgerEntries: ledgerEntries.map((e) => ({
        id: e.id,
        amount: e.amount,
        txType: e.txType,
        idempotencyKey: e.idempotencyKey,
        referenceId: e.referenceId,
        description: e.description,
        createdAt: e.createdAt.toISOString(),
      })),
      unlocks: unlocks.map((u) => ({
        unlockId: u.id,
        propertyHash: u.propertyHash,
        latitude: u.latitude,
        longitude: u.longitude,
        addressText: u.addressText,
        productType: u.productType,
        providerSource: u.providerSource,
        creditsCharged: u.creditsCharged,
        isCached: u.isCached,
        propertyProfile: u.propertyProfilePayload?.propertyProfile || u.propertyProfilePayload || null,
        createdAt: u.createdAt.toISOString(),
      })),
      auditLogs: auditLogs.map((log) => ({
        id: log.id,
        action: log.action,
        ipAddress: log.ipAddress,
        userAgent: log.userAgent,
        metadata: log.metadata,
        createdAt: log.createdAt.toISOString(),
      })),
    });
  } catch (err) {
    if (err instanceof UnauthorizedError) {
      return apiError("UNAUTHORIZED", err.message, 401);
    }
    if (err instanceof ForbiddenError) {
      return apiError("FORBIDDEN", err.message, 403);
    }
    console.error(`[GET /api/enrichment/admin/accounts/${params.accountId}] Error:`, err);
    return apiError("INTERNAL_ERROR", "An internal error occurred.", 500);
  }
}
