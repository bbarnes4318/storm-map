import { pgTable, uuid, varchar, integer, timestamp, unique, decimal, text, boolean, jsonb, check, index } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

// 1. Accounts Table (Auth-Provider Agnostic, Credit Balance Store)
export const accounts = pgTable("accounts", {
  id: uuid("id").defaultRandom().primaryKey(),
  authProvider: varchar("auth_provider", { length: 50 }).notNull(),   // e.g., 'clerk', 'supabase', 'custom'
  authUserId: varchar("auth_user_id", { length: 255 }).notNull(),     // External provider user ID mapping
  email: varchar("email", { length: 255 }).notNull().unique(),
  creditBalance: integer("credit_balance").default(0).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => {
  return {
    authProviderUserIdx: unique("auth_provider_user_idx").on(table.authProvider, table.authUserId),
    creditBalanceCheck: check("credit_balance_check", sql`${table.creditBalance} >= 0`),
  };
});

// 2. Compliance Attestations Table
export const complianceAttestations = pgTable("compliance_attestations", {
  id: uuid("id").defaultRandom().primaryKey(),
  accountId: uuid("account_id").references(() => accounts.id, { onDelete: "cascade" }).notNull(),
  attestedAt: timestamp("attested_at", { withTimezone: true }).defaultNow().notNull(),
  ipAddress: varchar("ip_address", { length: 45 }).notNull(),
  userAgent: text("user_agent").notNull(),
  attestationText: text("attestation_text").notNull(),
}, (table) => {
  return {
    accountIdIdx: index("attestations_account_id_idx").on(table.accountId),
  };
});

// 3. Credit Transaction Ledger Table
export const creditLedger = pgTable("credit_ledger", {
  id: uuid("id").defaultRandom().primaryKey(),
  accountId: uuid("account_id").references(() => accounts.id, { onDelete: "restrict" }).notNull(),
  amount: integer("amount").notNull(), // Positive for buy/refund, negative for spend
  txType: varchar("tx_type", { length: 50 }).notNull(), // BUY_CREDITS, SPEND_CREDITS, REFUND_CREDITS, VOID_CREDITS
  idempotencyKey: varchar("idempotency_key", { length: 255 }).unique().notNull(),
  referenceId: varchar("reference_id", { length: 255 }), // Links to specific unlocks or purchases
  description: text("description"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => {
  return {
    accountIdIdx: index("ledger_account_id_idx").on(table.accountId),
  };
});

// 4. Enrichment Quotes Table
export const enrichmentQuotes = pgTable("enrichment_quotes", {
  id: uuid("id").defaultRandom().primaryKey(),
  accountId: uuid("account_id").references(() => accounts.id, { onDelete: "cascade" }).notNull(),
  propertyHash: varchar("property_hash", { length: 64 }).notNull(), // SHA256 of lowercase full address
  latitude: decimal("latitude", { precision: 9, scale: 6 }).notNull(),
  longitude: decimal("longitude", { precision: 9, scale: 6 }).notNull(),
  addressText: text("address_text").notNull(),
  productType: varchar("product_type", { length: 50 }).notNull(), // PROPERTY_PROFILE, OWNER_CONTACT, ROOF_INTELLIGENCE, FULL_STORM_LEAD
  creditCost: integer("credit_cost").notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => {
  return {
    accountIdIdx: index("quotes_account_id_idx").on(table.accountId),
  };
});

// 5. Enrichment Unlocks Table
export const enrichmentUnlocks = pgTable("enrichment_unlocks", {
  id: uuid("id").defaultRandom().primaryKey(),
  accountId: uuid("account_id").references(() => accounts.id, { onDelete: "restrict" }).notNull(),
  propertyHash: varchar("property_hash", { length: 64 }).notNull(),
  latitude: decimal("latitude", { precision: 9, scale: 6 }).notNull(),
  longitude: decimal("longitude", { precision: 9, scale: 6 }).notNull(),
  addressText: text("address_text").notNull(),
  productType: varchar("product_type", { length: 50 }).notNull(),
  
  // Provider Metadata & Cost Audit Tracking
  providerSource: varchar("provider_source", { length: 50 }).notNull(),
  providerRequestId: varchar("provider_request_id", { length: 255 }),
  providerCostEstimate: decimal("provider_cost_estimate", { precision: 10, scale: 4 }).default("0.0000"),
  creditsCharged: integer("credits_charged").notNull(),
  isCached: boolean("is_cached").default(false).notNull(),
  
  // Segmented Payloads
  propertyProfilePayload: jsonb("property_profile_payload"), // Public non-sensitive details (Unencrypted JSON)
  encryptedContactPayload: text("encrypted_contact_payload"), // Sensitive contact details (Names, Phones, Emails - AES Encrypted)
  
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => {
  return {
    accountPropertyProductIdx: unique("account_prop_prod_idx").on(table.accountId, table.propertyHash, table.productType),
  };
});

// 6. Suppression / Opt-Out List Table
export const suppressionList = pgTable("suppression_list", {
  id: uuid("id").defaultRandom().primaryKey(),
  supType: varchar("sup_type", { length: 20 }).notNull(), // PHONE, EMAIL, ADDRESS
  valueHash: varchar("value_hash", { length: 64 }).unique().notNull(), // SHA256 of lowercase item value
  reason: varchar("reason", { length: 255 }).default("Opt-Out"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// 7. Audit / Access Logs Table
export const auditLogs = pgTable("audit_logs", {
  id: uuid("id").defaultRandom().primaryKey(),
  accountId: uuid("account_id").references(() => accounts.id, { onDelete: "set null" }),
  action: varchar("action", { length: 100 }).notNull(), // e.g., 'UNLOCK_LEAD', 'VIEW_CONTACT_DATA'
  ipAddress: varchar("ip_address", { length: 45 }).notNull(),
  userAgent: text("user_agent").notNull(),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => {
  return {
    accountIdIdx: index("audit_account_id_idx").on(table.accountId),
    actionIdx: index("audit_action_idx").on(table.action),
    createdAtIdx: index("audit_created_at_idx").on(table.createdAt),
  };
});
