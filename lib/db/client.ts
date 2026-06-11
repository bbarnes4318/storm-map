/**
 * Server-only database client factory.
 *
 * Provides a Drizzle PostgreSQL client connected via DATABASE_URL.
 * This module MUST NOT be imported from client-side code.
 *
 * IMPORTANT: Until database migrations are run (Phase 1F+), the tables
 * referenced by Drizzle schema do not exist. API routes should use
 * the in-memory mock stores when ENRICHMENT_MOCK_MODE=true.
 *
 * When DATABASE_URL is missing, getDbClient() returns null so route
 * handlers can detect the absence and fall back to mock behavior.
 */

import "server-only";


import { Pool } from "pg";
import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";

// Re-export schema for convenience
export * from "./schema/enrichment";

// ==============================================================================
// Lazy-initialized Drizzle client singleton
// ==============================================================================

/**
 * Internal singleton. `undefined` means not yet initialized.
 * `null` means DATABASE_URL was missing at init time.
 */
let _dbClient: NodePgDatabase | null | undefined;

/**
 * Returns a Drizzle client connected to the PostgreSQL database,
 * or null if DATABASE_URL is not configured.
 *
 * The client is lazily initialized on first call and cached for
 * subsequent calls. This function never throws — it returns null
 * when the database is not available, allowing route handlers to
 * fall back to mock behavior gracefully.
 *
 * Usage:
 *   const db = getDbClient();
 *   if (!db) {
 *     // DATABASE_URL not set — use mock store instead
 *   }
 */
export function getDbClient(): NodePgDatabase | null {
  if (_dbClient !== undefined) return _dbClient;

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.warn(
      "[db/client] DATABASE_URL is not set. Database operations will not be available. " +
      "Use ENRICHMENT_MOCK_MODE=true for development."
    );
    _dbClient = null;
    return _dbClient;
  }

  // Create a connection pool and Drizzle client.
  // This does NOT connect immediately — pg Pool connects lazily on first query.
  // If DATABASE_URL is malformed or the server is unreachable, the error will
  // surface at query time, not at import time.
  const pool = new Pool({ connectionString: databaseUrl });
  _dbClient = drizzle(pool);
  return _dbClient;
}
