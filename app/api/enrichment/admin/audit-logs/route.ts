import { NextRequest } from "next/server";
import { assertEnrichmentAdmin, ForbiddenError } from "@/lib/enrichment/admin-auth";
import { apiSuccess, apiError } from "@/lib/enrichment/api-response";
import { getEnrichmentStore } from "@/lib/enrichment/stores";
import { UnauthorizedError } from "@/lib/enrichment/auth";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    // Assert user is an authorized admin
    await assertEnrichmentAdmin(request);

    const store = getEnrichmentStore();
    const searchParams = request.nextUrl.searchParams;

    const accountId = searchParams.get("accountId") || undefined;
    const action = searchParams.get("action") || undefined;
    
    const limitParam = parseInt(searchParams.get("limit") || "50", 10);
    const limit = isNaN(limitParam) ? 50 : Math.min(limitParam, 100);
    const offsetParam = parseInt(searchParams.get("offset") || "0", 10);
    const offset = isNaN(offsetParam) ? 0 : offsetParam;

    const logs = await store.audit.listAuditLogs({
      accountId,
      action,
      limit,
      offset,
    });

    // Resolve emails for the accounts referenced in audit logs
    const uniqueAccountIds = Array.from(new Set(logs.map((l) => l.accountId).filter(Boolean))) as string[];
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
      auditLogs: logs.map((log) => ({
        id: log.id,
        accountId: log.accountId,
        email: log.accountId ? emailMap.get(log.accountId) || "unknown@storm-map.local" : "system",
        action: log.action,
        ipAddress: log.ipAddress,
        userAgent: log.userAgent,
        metadata: log.metadata, // Safe metadata only
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
    console.error("[GET /api/enrichment/admin/audit-logs] Error:", err);
    return apiError("INTERNAL_ERROR", "An internal error occurred.", 500);
  }
}
