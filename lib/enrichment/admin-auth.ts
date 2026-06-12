/**
 * Server-side admin authorization guards for the enrichment system.
 *
 * Checks if the authenticated Clerk user is allowed to access admin actions
 * by comparing their identity against the server-side environment allowlists.
 */

import "server-only";
import { currentUser } from "@clerk/nextjs/server";
import { getEnrichmentStore } from "./stores";
import { UnauthorizedError, ClerkNotConfiguredError, type EnrichmentAccountContext } from "./auth";

export class ForbiddenError extends Error {
  constructor(message = "Access denied. Admin authorization required.") {
    super(message);
    this.name = "ForbiddenError";
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
}

/**
 * Evaluates whether a Clerk user is configured as an admin in the allowlist.
 */
export function isAdminClerkUser(clerkUser: any): boolean {
  if (!clerkUser) return false;

  // 1. ENRICHMENT_ADMIN_ENABLED master switch (default is true if allowlists exist)
  const adminEnabled = process.env.ENRICHMENT_ADMIN_ENABLED;
  if (adminEnabled && adminEnabled !== "true" && adminEnabled !== "yes" && adminEnabled !== "1") {
    return false;
  }

  // 2. Parse allowlists
  const adminEmails = (process.env.ENRICHMENT_ADMIN_EMAILS || "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

  const adminUserIds = (process.env.ENRICHMENT_ADMIN_CLERK_USER_IDS || "")
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);

  // If no allowlists are configured, block admin access entirely
  if (adminEmails.length === 0 && adminUserIds.length === 0) {
    return false;
  }

  // 3. Match Clerk User ID
  if (adminUserIds.includes(clerkUser.id)) {
    return true;
  }

  // 4. Match Email Addresses
  const userEmails = clerkUser.emailAddresses?.map((e: any) => e.emailAddress.toLowerCase()) || [];
  for (const email of userEmails) {
    if (adminEmails.includes(email)) {
      return true;
    }
  }

  return false;
}

/**
 * Resolves the authenticated Clerk user, validates admin authorization,
 * and upserts their internal account mapping.
 */
export async function getCurrentAdminAccount(request: Request): Promise<EnrichmentAccountContext> {
  const isMockMode = process.env.ENRICHMENT_MOCK_MODE === "true";
  const isDbTestAuth = process.env.ENRICHMENT_DB_TEST_AUTH === "true";

  // Mock / DB Test Auth bypass
  if (isMockMode || isDbTestAuth) {
    return {
      accountId: "00000000-0000-4000-a000-000000000001",
      authProvider: "mock",
      authUserId: "mock-user",
      email: "mock-user@storm-map.local",
      creditBalance: 1000,
    };
  }

  // Enforce Clerk Configuration
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || !process.env.CLERK_SECRET_KEY) {
    throw new ClerkNotConfiguredError();
  }

  // Clerk test bypass support
  let clerkUser: any = null;
  const testUserIdHeader = request.headers.get("x-clerk-test-user-id");
  if (testUserIdHeader && process.env.ENRICHMENT_TEST_CLERK_BYPASS === "true") {
    try {
      const res = await fetch(`https://api.clerk.com/v1/users/${testUserIdHeader}`, {
        headers: {
          "Authorization": `Bearer ${process.env.CLERK_SECRET_KEY}`,
        },
      });
      if (res.status === 200) {
        const data = await res.json();
        clerkUser = {
          id: data.id,
          primaryEmailAddressId: data.primary_email_address_id,
          emailAddresses: data.email_addresses.map((e: any) => ({
            id: e.id,
            emailAddress: e.email_address,
          })),
        };
      }
    } catch (err) {
      console.error("[getCurrentAdminAccount] Clerk test bypass fetch error:", err);
    }
  }

  if (!clerkUser) {
    clerkUser = await currentUser();
  }

  if (!clerkUser) {
    throw new UnauthorizedError();
  }

  // Verify Admin authorization
  if (!isAdminClerkUser(clerkUser)) {
    throw new ForbiddenError();
  }

  // Extract email address
  const primaryEmail = clerkUser.emailAddresses?.find(
    (email: any) => email.id === clerkUser.primaryEmailAddressId
  )?.emailAddress || clerkUser.emailAddresses?.[0]?.emailAddress || "";

  if (!primaryEmail) {
    throw new Error("Admin user context must contain a valid email address.");
  }

  // Upsert internal DB account
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
}

/**
 * Asserts that the request is executed by an authorized admin user.
 */
export async function assertEnrichmentAdmin(request: Request): Promise<EnrichmentAccountContext> {
  return getCurrentAdminAccount(request);
}
