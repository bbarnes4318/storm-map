-- Phase 1J: Initial enrichment schema migration
-- Generated from lib/db/schema/enrichment.ts
-- Applied via psql inside the storm-map-postgres container
--
-- Tables: accounts, compliance_attestations, credit_ledger,
--         enrichment_quotes, enrichment_unlocks, suppression_list, audit_logs

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Accounts
CREATE TABLE IF NOT EXISTS accounts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  auth_provider VARCHAR(50) NOT NULL,
  auth_user_id VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  credit_balance INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT auth_provider_user_idx UNIQUE (auth_provider, auth_user_id),
  CONSTRAINT credit_balance_check CHECK (credit_balance >= 0)
);

-- 2. Compliance Attestations
CREATE TABLE IF NOT EXISTS compliance_attestations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  attested_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  ip_address VARCHAR(45) NOT NULL,
  user_agent TEXT NOT NULL,
  attestation_text TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS attestations_account_id_idx ON compliance_attestations(account_id);

-- 3. Credit Ledger
CREATE TABLE IF NOT EXISTS credit_ledger (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE RESTRICT,
  amount INTEGER NOT NULL,
  tx_type VARCHAR(50) NOT NULL,
  idempotency_key VARCHAR(255) NOT NULL UNIQUE,
  reference_id VARCHAR(255),
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS ledger_account_id_idx ON credit_ledger(account_id);

-- 4. Enrichment Quotes
CREATE TABLE IF NOT EXISTS enrichment_quotes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  property_hash VARCHAR(64) NOT NULL,
  latitude DECIMAL(9,6) NOT NULL,
  longitude DECIMAL(9,6) NOT NULL,
  address_text TEXT NOT NULL,
  product_type VARCHAR(50) NOT NULL,
  credit_cost INTEGER NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS quotes_account_id_idx ON enrichment_quotes(account_id);

-- 5. Enrichment Unlocks
CREATE TABLE IF NOT EXISTS enrichment_unlocks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE RESTRICT,
  property_hash VARCHAR(64) NOT NULL,
  latitude DECIMAL(9,6) NOT NULL,
  longitude DECIMAL(9,6) NOT NULL,
  address_text TEXT NOT NULL,
  product_type VARCHAR(50) NOT NULL,
  provider_source VARCHAR(50) NOT NULL,
  provider_request_id VARCHAR(255),
  provider_cost_estimate DECIMAL(10,4) DEFAULT 0.0000,
  credits_charged INTEGER NOT NULL,
  is_cached BOOLEAN NOT NULL DEFAULT FALSE,
  property_profile_payload JSONB,
  encrypted_contact_payload TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT account_prop_prod_idx UNIQUE (account_id, property_hash, product_type)
);

-- 6. Suppression List
CREATE TABLE IF NOT EXISTS suppression_list (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  sup_type VARCHAR(20) NOT NULL,
  value_hash VARCHAR(64) NOT NULL UNIQUE,
  reason VARCHAR(255) DEFAULT 'Opt-Out',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. Audit Logs
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  account_id UUID REFERENCES accounts(id) ON DELETE SET NULL,
  action VARCHAR(100) NOT NULL,
  ip_address VARCHAR(45) NOT NULL,
  user_agent TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS audit_account_id_idx ON audit_logs(account_id);
CREATE INDEX IF NOT EXISTS audit_action_idx ON audit_logs(action);
CREATE INDEX IF NOT EXISTS audit_created_at_idx ON audit_logs(created_at);
