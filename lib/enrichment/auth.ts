/**
 * Server-only mock account resolver for enrichment API routes.
 *
 * In development (ENRICHMENT_MOCK_MODE=true), returns a deterministic
 * mock account context. In production without a real auth provider,
 * throws an explicit error rather than silently falling through.
 *
 * No password auth. No login/signup. No auth UI.
 */

// SERVER-ONLY: This module must only be imported by server-side code (API routes,
// other lib/ modules). Do not import from client components. The `server-only`
// package is not currently installed; server-only enforcement is structural.

export interface EnrichmentAccountContext {
  accountId: string;
  authProvider: string;
  authUserId: string;
  email: string;
}

export class AuthNotConfiguredError extends Error {
  constructor() {
    super(
      "Authentication is not configured. " +
      "Set ENRICHMENT_MOCK_MODE=true for development, or integrate a real auth provider for production."
    );
    this.name = "AuthNotConfiguredError";
    Object.setPrototypeOf(this, AuthNotConfiguredError.prototype);
  }
}

/** Deterministic mock account returned in mock mode. */
const MOCK_ACCOUNT: EnrichmentAccountContext = {
  accountId: "00000000-0000-4000-a000-000000000001",
  authProvider: "mock",
  authUserId: "mock-user",
  email: "mock-user@storm-map.local",
};

/**
 * Resolves the current enrichment account from the incoming request.
 *
 * @param _request - The incoming Request object (unused in mock mode,
 *   reserved for real auth header extraction in future phases).
 * @returns The resolved account context.
 * @throws AuthNotConfiguredError if mock mode is off and no real auth exists.
 */
export async function getCurrentEnrichmentAccount(
  _request: Request
): Promise<EnrichmentAccountContext> {
  // Real auth integration point:
  // When a production auth provider (Clerk, Supabase, etc.) is added,
  // extract and verify the session/token from _request headers here.
  // For now, no real auth provider exists.

  if (process.env.ENRICHMENT_MOCK_MODE === "true") {
    return MOCK_ACCOUNT;
  }

  throw new AuthNotConfiguredError();
}
