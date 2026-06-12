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
    const emailQuery = request.nextUrl.searchParams.get("email") || undefined;
    const accounts = await store.accounts.listAccounts(emailQuery);

    return apiSuccess({
      accounts: accounts.map((acc) => ({
        accountId: acc.id,
        email: acc.email,
        authProvider: acc.authProvider,
        authUserId: acc.authUserId,
        creditBalance: acc.creditBalance,
        createdAt: acc.createdAt.toISOString(),
        updatedAt: acc.updatedAt.toISOString(),
      })),
    });
  } catch (err) {
    if (err instanceof UnauthorizedError) {
      return apiError("UNAUTHORIZED", err.message, 401);
    }
    if (err instanceof ForbiddenError) {
      return apiError("FORBIDDEN", err.message, 403);
    }
    console.error("[GET /api/enrichment/admin/accounts] Error:", err);
    return apiError("INTERNAL_ERROR", "An internal error occurred.", 500);
  }
}
