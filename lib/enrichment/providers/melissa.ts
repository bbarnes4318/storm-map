import { EnrichmentProvider, EnrichmentProviderInput, EnrichmentProviderResponse } from "./base";
import { DataProductType, NormalizedEnrichmentResult } from "../schemas";
import { EnrichmentProviderError } from "./errors";

/**
 * Melissa Personator Consumer API provider.
 *
 * Used ONLY for selected-address homeowner contact lookup (name, phone, email).
 * NOT used for radius/bulk address collection.
 *
 * Requires:
 * - MELISSA_ENABLED=true
 * - MELISSA_LICENSE_KEY set server-side (NEVER committed, NEVER NEXT_PUBLIC_)
 * - MELISSA_TIMEOUT_MS for request timeout
 */

const MELISSA_API_URL = "https://personator.melissadata.net/v3/WEB/ContactVerify/doContactVerify";

export class MelissaEnrichmentProvider implements EnrichmentProvider {
  providerName = "melissa";
  providerDisplayName = "Melissa Data Solutions";
  supportedProducts: DataProductType[] = ["OWNER_CONTACT"];

  isConfigured(): boolean {
    return !!(
      process.env.MELISSA_ENABLED === "true" &&
      process.env.MELISSA_LICENSE_KEY
    );
  }

  async enrich(input: EnrichmentProviderInput): Promise<EnrichmentProviderResponse> {
    if (!this.isConfigured()) {
      throw new EnrichmentProviderError(
        "PROVIDER_NOT_CONFIGURED",
        this.providerName,
        "Melissa provider is not configured. Set MELISSA_ENABLED=true and MELISSA_LICENSE_KEY."
      );
    }

    if (!this.supportedProducts.includes(input.productType)) {
      throw new EnrichmentProviderError(
        "UNSUPPORTED_PRODUCT",
        this.providerName,
        `Product type ${input.productType} is not supported by Melissa`
      );
    }

    const licenseKey = process.env.MELISSA_LICENSE_KEY!;
    const timeoutMs = parseInt(process.env.MELISSA_TIMEOUT_MS || "8000", 10);

    // Parse address into components for Melissa
    const { address } = input;
    // Extract city, state, zip from SelectedPropertyTarget-style context
    // The input.address is the full address string

    // Build Melissa request URL
    const params = new URLSearchParams({
      id: licenseKey,
      act: "Check",
      cols: "grpName,grpAddress,grpPhone,grpEmail",
      a1: address,
      format: "json",
    });

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    let response: Response;
    try {
      response = await fetch(`${MELISSA_API_URL}?${params.toString()}`, {
        method: "GET",
        signal: controller.signal,
      });
    } catch (err: any) {
      clearTimeout(timer);
      if (err.name === "AbortError") {
        throw new EnrichmentProviderError(
          "PROVIDER_TIMEOUT",
          this.providerName,
          `Melissa API request timed out after ${timeoutMs}ms`
        );
      }
      throw new EnrichmentProviderError(
        "PROVIDER_UNKNOWN_ERROR",
        this.providerName,
        `Melissa API request failed: ${err.message || "Network error"}`
      );
    } finally {
      clearTimeout(timer);
    }

    // Handle HTTP errors
    if (response.status === 401 || response.status === 403) {
      throw new EnrichmentProviderError(
        "PROVIDER_AUTH_FAILED",
        this.providerName,
        "Melissa API authentication failed. Check MELISSA_LICENSE_KEY."
      );
    }

    if (response.status === 429) {
      throw new EnrichmentProviderError(
        "PROVIDER_RATE_LIMITED",
        this.providerName,
        "Melissa API rate limit exceeded. Try again later."
      );
    }

    if (!response.ok) {
      throw new EnrichmentProviderError(
        "PROVIDER_UNKNOWN_ERROR",
        this.providerName,
        `Melissa API returned HTTP ${response.status}`
      );
    }

    let data: any;
    try {
      data = await response.json();
    } catch {
      throw new EnrichmentProviderError(
        "PROVIDER_UNKNOWN_ERROR",
        this.providerName,
        "Melissa API returned invalid JSON response"
      );
    }

    // Check for valid records
    const records = data?.Records;
    if (!records || !Array.isArray(records) || records.length === 0) {
      throw new EnrichmentProviderError(
        "PROVIDER_NO_MATCH",
        this.providerName,
        "No contact match found for this address"
      );
    }

    const record = records[0];

    // Check Melissa result codes for no-match scenarios
    const resultCodes = (record.Results || "").split(",").map((s: string) => s.trim());
    const hasAddressError = resultCodes.some((c: string) => c.startsWith("AE"));
    const hasNoMatch = resultCodes.includes("NS01") || resultCodes.includes("NS02");

    if (hasNoMatch || (hasAddressError && !record.NameFirst && !record.PhoneNumber)) {
      throw new EnrichmentProviderError(
        "PROVIDER_NO_MATCH",
        this.providerName,
        "No homeowner contact match was found for this property"
      );
    }

    // Normalize into our standard schema
    const now = new Date().toISOString();
    const normalizedResult: NormalizedEnrichmentResult = {
      providerSource: this.providerName,
      providerRequestId: data.TransmissionReference || undefined,
      productType: "OWNER_CONTACT",
      normalizedAt: now,
      contactData: {
        ...(record.NameFirst ? {
          firstName: {
            value: record.NameFirst,
            source: this.providerName,
            confidence: 0.85,
            lastUpdated: now,
          },
        } : {}),
        ...(record.NameLast ? {
          lastName: {
            value: record.NameLast,
            source: this.providerName,
            confidence: 0.85,
            lastUpdated: now,
          },
        } : {}),
        ...((record.PhoneNumber) ? {
          phones: {
            value: [{
              number: record.PhoneNumber,
              type: (record.PhoneType || "").toLowerCase().includes("mobile") ? "mobile" as const
                : (record.PhoneType || "").toLowerCase().includes("land") ? "landline" as const
                : "unknown" as const,
              dncStatus: false,
              litigatorStatus: false,
            }],
            source: this.providerName,
            confidence: 0.75,
            lastUpdated: now,
          },
        } : {}),
        ...((record.EmailAddress) ? {
          emails: {
            value: [{
              address: record.EmailAddress,
              deliverability: "unknown" as const,
            }],
            source: this.providerName,
            confidence: 0.7,
            lastUpdated: now,
          },
        } : {}),
        ...((record.AddressLine1) ? {
          mailingAddress: {
            value: [record.AddressLine1, record.City, record.State, record.PostalCode].filter(Boolean).join(", "),
            source: this.providerName,
            confidence: 0.9,
            lastUpdated: now,
          },
        } : {}),
      },
    };

    // Verify we have at least some useful data
    const contact = normalizedResult.contactData;
    const hasAnyData = contact?.firstName || contact?.lastName || contact?.phones || contact?.emails;

    if (!hasAnyData) {
      throw new EnrichmentProviderError(
        "PROVIDER_NO_MATCH",
        this.providerName,
        "No homeowner contact match was found for this property"
      );
    }

    return {
      success: true,
      providerSource: this.providerName,
      providerRequestId: data.TransmissionReference || undefined,
      confidenceScore: 0.8,
      data: normalizedResult,
      normalizedAt: new Date(),
    };
  }
}

export default MelissaEnrichmentProvider;
