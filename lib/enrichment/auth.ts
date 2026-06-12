/**
 * Server-only account resolver for enrichment API routes.
 *
 * Integrates with Clerk authentication to resolve the authenticated user
 * context and map them to an internal persistent account in PostgreSQL.
 *
 * Fallback to deterministic mock account context is supported when
 * ENRICHMENT_MOCK_MODE=true or ENRICHMENT_DB_TEST_AUTH=true.
 */

import "server-only";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { getEnrichmentStore } from "./stores";
import { apiError } from "./api-response";

// ==============================================================================
// Types & Interfaces
// ==============================================================================

export interface EnrichmentAccountContext {
  accountId: string;
  authProvider: string;
  authUserId: string;
  email: string;
  creditBalance?: number;
}

// ==============================================================================
// Custom Auth Errors
// ==============================================================================

export class AuthNotConfiguredError extends Error {
  constructor(message = "Authentication is not configured.") {
    super(message);
    this.name = "AuthNotConfiguredError";
    Object.setPrototypeOf(this, AuthNotConfiguredError.prototype);
  }
}

export class ClerkNotConfiguredError extends Error {
  constructor() {
    super("Clerk environment keys (NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY, CLERK_SECRET_KEY) are not configured.");
    this.name = "ClerkNotConfiguredError";
    Object.setPrototypeOf(this, ClerkNotConfiguredError.prototype);
  }
}

export class UnauthorizedError extends Error {
  constructor() {
    super("No signed-in user found. Please authenticate.");
    this.name = "UnauthorizedError";
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}

export class DatabaseNotConfiguredError extends Error {
  constructor(message = "Database persistence is not configured.") {
    super(message);
    this.name = "DatabaseNotConfiguredError";
    Object.setPrototypeOf(this, DatabaseNotConfiguredError.prototype);
  }
}

export class AccountResolutionError extends Error {
  constructor(message = "Failed to resolve or upsert account context.") {
    super(message);
    this.name = "AccountResolutionError";
    Object.setPrototypeOf(this, AccountResolutionError.prototype);
  }
}

// ==============================================================================
// Mock Constants
// ==============================================================================

const MOCK_ACCOUNT: EnrichmentAccountContext = {
  accountId: "00000000-0000-4000-a000-000000000001",
  authProvider: "mock",
  authUserId: "mock-user",
  email: "mock-user@storm-map.local",
  creditBalance: 100,
};

// ==============================================================================
// Resolver
// ==============================================================================

/**
 * Resolves the current enrichment account from the incoming request.
 *
 * - In Mock Mode or DB Test mode: Returns the deterministic mock account.
 * - In Production Auth Mode: Enforces Clerk authentication, extracts user details,
 *   upserts the user into the `accounts` database table, and returns the context.
 *
 * @param _request - The incoming Request object.
 * @returns The resolved account context.
 * @throws UnauthorizedError if no signed-in user is found.
 * @throws ClerkNotConfiguredError if Clerk environment keys are missing.
 * @throws DatabaseNotConfiguredError if database/store is unreachable.
 */
export async function getCurrentEnrichmentAccount(
  _request: Request
): Promise<EnrichmentAccountContext> {
  const isMockMode = process.env.ENRICHMENT_MOCK_MODE === "true";
  const isDbTestAuth = process.env.ENRICHMENT_DB_TEST_AUTH === "true";

  // 1. Mock / Controlled DB Test Auth fallback
  if (isMockMode || isDbTestAuth) {
    return MOCK_ACCOUNT;
  }

  // 2. Enforce Clerk Authentication Configuration
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || !process.env.CLERK_SECRET_KEY) {
    throw new ClerkNotConfiguredError();
  }

  // 3. Retrieve authenticated Clerk user context
  let clerkUser;
  try {
    clerkUser = await currentUser();
  } catch (err) {
    console.error("[getCurrentEnrichmentAccount] Clerk authentication error:", err);
    throw new AuthNotConfiguredError(`Clerk resolution failed: ${err instanceof Error ? err.message : String(err)}`);
  }

  if (!clerkUser) {
    throw new UnauthorizedError();
  }

  // 4. Extract primary email address
  const primaryEmail = clerkUser.emailAddresses.find(
    (email) => email.id === clerkUser.primaryEmailAddressId
  )?.emailAddress || clerkUser.emailAddresses[0]?.emailAddress || "";

  if (!primaryEmail) {
    throw new AccountResolutionError("Authenticated Clerk user must have a valid email address.");
  }

  // 5. Upsert internal database account mapping
  try {
    const store = getEnrichmentStore();
    const dbAccount = await store.accounts.upsertAccountFromAuthIdentity({
      authProvider: "clerk",
      authUserId: clerkUser.id,
      email: primaryEmail,
    });

    return {
      accountId: dbAccount.id,
      authProvider: dbAccount.authProvider,
      authUserId: dbAccount.authUserId,
      email: dbAccount.email,
      creditBalance: dbAccount.creditBalance,
    };
  } catch (err) {
    console.error("[getCurrentEnrichmentAccount] Database account mapping failure:", err);
    
    // Distinguish database connection/configuration errors
    if (err instanceof Error && (err.message.includes("DATABASE_URL") || err.message.includes("Drizzle"))) {
      throw new DatabaseNotConfiguredError();
    }
    throw new AccountResolutionError(
      `Database mapping failed: ${err instanceof Error ? err.message : String(err)}`
    );
  }
}

/**
 * Shared error mapper to convert authentication and database configuration
 * errors thrown by the resolver into standard API JSON error responses.
 */
export function handleAuthError(err: unknown): NextResponse | null {
  if (err instanceof UnauthorizedError) {
    return apiError("UNAUTHORIZED", err.message, 401);
  }
  if (err instanceof ClerkNotConfiguredError) {
    return apiError("CLERK_NOT_CONFIGURED", err.message, 501);
  }
  if (err instanceof DatabaseNotConfiguredError) {
    return apiError("DATABASE_NOT_CONFIGURED", err.message, 503);
  }
  if (err instanceof AccountResolutionError) {
    return apiError("ACCOUNT_RESOLUTION_FAILED", err.message, 500);
  }
  if (err instanceof AuthNotConfiguredError) {
    return apiError("AUTH_NOT_CONFIGURED", err.message, 501);
  }
  return null;
}
