#!/usr/bin/env node
/**
 * Phase 1H Integration Verification Script
 *
 * Tests the enrichment API routes against a running dev server in mock mode.
 * Validates the full attestation → quote → unlock → unlocked-data flow.
 *
 * Prerequisites:
 *   ENRICHMENT_MOCK_MODE=true in .env.local
 *   ENRICHMENT_ENCRYPTION_KEY set (64 hex chars = 32 bytes)
 *   npm run dev running on port 3000
 *
 * Usage:
 *   node scripts/verify-enrichment.mjs
 */

const BASE_URL = process.env.BASE_URL || "http://localhost:3000/storm-map";

async function fetchJSON(url, options = {}) {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });
  const body = await res.text();
  let json;
  try {
    json = JSON.parse(body);
  } catch {
    json = null;
  }
  return { status: res.status, body: json, raw: body };
}

let passed = 0;
let failed = 0;

function assert(condition, testName, detail = "") {
  if (condition) {
    console.log(`  ✅ PASS: ${testName}`);
    passed++;
  } else {
    console.error(`  ❌ FAIL: ${testName}${detail ? ` — ${detail}` : ""}`);
    failed++;
  }
}

async function main() {
  console.log("=== Phase 1H Enrichment API Verification ===");
  console.log(`Target: ${BASE_URL}`);
  console.log("");

  // -------------------------------------------------------------------------
  // 1. POST /api/enrichment/attest — Record attestation
  // -------------------------------------------------------------------------
  console.log("--- Test 1: POST /api/enrichment/attest ---");
  const attestRes = await fetchJSON(`${BASE_URL}/api/enrichment/attest`, {
    method: "POST",
    body: JSON.stringify({ agree: true }),
  });
  assert(attestRes.status === 200, "Attest returns 200", `Got ${attestRes.status}: ${attestRes.raw}`);
  assert(attestRes.body?.success === true, "Attest response has success=true");
  assert(attestRes.body?.data?.attestation?.id, "Attest returns attestation with ID");

  // Test invalid request
  const attestBadRes = await fetchJSON(`${BASE_URL}/api/enrichment/attest`, {
    method: "POST",
    body: JSON.stringify({ agree: false }),
  });
  assert(attestBadRes.status === 400, "Attest with agree=false returns 400", `Got ${attestBadRes.status}`);

  // -------------------------------------------------------------------------
  // 2. POST /api/enrichment/quote — Generate a quote
  // -------------------------------------------------------------------------
  console.log("\n--- Test 2: POST /api/enrichment/quote ---");
  const quoteRes = await fetchJSON(`${BASE_URL}/api/enrichment/quote`, {
    method: "POST",
    body: JSON.stringify({
      latitude: 30.267153,
      longitude: -97.743057,
      address: "100 Congress Ave, Austin, TX 78701",
      productType: "PROPERTY_PROFILE",
    }),
  });
  assert(quoteRes.status === 200, "Quote returns 200", `Got ${quoteRes.status}: ${quoteRes.raw}`);
  assert(quoteRes.body?.data?.quoteId, "Quote returns quoteId");
  assert(typeof quoteRes.body?.data?.creditCost === "number", "Quote returns numeric creditCost");
  const quoteId = quoteRes.body?.data?.quoteId;
  const creditCost = quoteRes.body?.data?.creditCost;
  console.log(`  📋 quoteId: ${quoteId}, creditCost: ${creditCost}`);

  // Test missing required fields
  const quoteBadRes = await fetchJSON(`${BASE_URL}/api/enrichment/quote`, {
    method: "POST",
    body: JSON.stringify({ latitude: 30.0 }),
  });
  assert(quoteBadRes.status === 400, "Quote with missing fields returns 400", `Got ${quoteBadRes.status}`);

  // -------------------------------------------------------------------------
  // 3. POST /api/enrichment/unlock — Unlock with valid quote
  // -------------------------------------------------------------------------
  console.log("\n--- Test 3: POST /api/enrichment/unlock ---");
  const idempotencyKey = `test-idem-${Date.now()}`;
  const unlockRes = await fetchJSON(`${BASE_URL}/api/enrichment/unlock`, {
    method: "POST",
    headers: { "Idempotency-Key": idempotencyKey },
    body: JSON.stringify({ quoteId }),
  });
  assert(unlockRes.status === 200, "Unlock returns 200", `Got ${unlockRes.status}: ${unlockRes.raw}`);
  assert(unlockRes.body?.data?.unlockId, "Unlock returns unlockId");
  assert(typeof unlockRes.body?.data?.creditsCharged === "number", "Unlock returns numeric creditsCharged");
  const unlockId = unlockRes.body?.data?.unlockId;
  console.log(`  🔓 unlockId: ${unlockId}`);

  // -------------------------------------------------------------------------
  // 4. Idempotency replay — Same key should not double-charge
  // -------------------------------------------------------------------------
  console.log("\n--- Test 4: Idempotency Replay ---");
  const replayRes = await fetchJSON(`${BASE_URL}/api/enrichment/unlock`, {
    method: "POST",
    headers: { "Idempotency-Key": idempotencyKey },
    body: JSON.stringify({ quoteId }),
  });
  assert(replayRes.status === 200, "Replay returns 200 (not error)", `Got ${replayRes.status}`);
  assert(
    replayRes.body?.data?.unlockId === unlockId,
    "Replay returns same unlockId",
    `Expected ${unlockId}, got ${replayRes.body?.data?.unlockId}`
  );

  // -------------------------------------------------------------------------
  // 5. GET /api/enrichment/unlocked-data — Retrieve unlocked data
  // -------------------------------------------------------------------------
  console.log("\n--- Test 5: GET /api/enrichment/unlocked-data ---");
  if (unlockId) {
    const dataRes = await fetchJSON(`${BASE_URL}/api/enrichment/unlocked-data?unlockId=${unlockId}`);
    assert(dataRes.status === 200, "Unlocked-data returns 200", `Got ${dataRes.status}: ${dataRes.raw}`);
    assert(dataRes.body?.data?.unlockId === unlockId, "Returns correct unlockId");
    assert(dataRes.body?.data?.productType === "PROPERTY_PROFILE", "Returns correct productType");
  } else {
    console.log("  ⚠️  Skipped: no unlockId from previous step");
  }

  // Test missing unlockId parameter
  const dataBadRes = await fetchJSON(`${BASE_URL}/api/enrichment/unlocked-data`);
  assert(dataBadRes.status === 400, "Unlocked-data without unlockId returns 400", `Got ${dataBadRes.status}`);

  // Test non-existent unlockId
  const dataNotFoundRes = await fetchJSON(`${BASE_URL}/api/enrichment/unlocked-data?unlockId=00000000-0000-0000-0000-000000000000`);
  assert(dataNotFoundRes.status === 404, "Unlocked-data with bad ID returns 404", `Got ${dataNotFoundRes.status}`);

  // -------------------------------------------------------------------------
  // 6. POST /api/enrichment/unlock — Missing idempotency key
  // -------------------------------------------------------------------------
  console.log("\n--- Test 6: Missing Idempotency Key ---");
  const noKeyRes = await fetchJSON(`${BASE_URL}/api/enrichment/unlock`, {
    method: "POST",
    body: JSON.stringify({ quoteId }),
  });
  assert(noKeyRes.status === 400, "Unlock without Idempotency-Key returns 400", `Got ${noKeyRes.status}`);

  // -------------------------------------------------------------------------
  // 7. POST /api/enrichment/unlock — Non-existent quote
  // -------------------------------------------------------------------------
  console.log("\n--- Test 7: Non-existent Quote ---");
  const badQuoteRes = await fetchJSON(`${BASE_URL}/api/enrichment/unlock`, {
    method: "POST",
    headers: { "Idempotency-Key": `bad-quote-${Date.now()}` },
    body: JSON.stringify({ quoteId: "00000000-0000-0000-0000-000000000000" }),
  });
  assert(
    badQuoteRes.status === 404 || badQuoteRes.status === 400,
    "Unlock with bad quoteId returns 404 or 400",
    `Got ${badQuoteRes.status}`
  );

  // -------------------------------------------------------------------------
  // Summary
  // -------------------------------------------------------------------------
  console.log("\n=== SUMMARY ===");
  console.log(`  Passed: ${passed}`);
  console.log(`  Failed: ${failed}`);
  console.log(`  Total:  ${passed + failed}`);
  process.exit(failed > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(2);
});
