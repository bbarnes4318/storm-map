import { EnrichmentProvider, EnrichmentProviderInput, EnrichmentProviderResponse } from "./base";
import { DataProductType, NormalizedEnrichmentResult } from "../schemas";
import { createFieldMetadata } from "./normalizers";
import { EnrichmentProviderError } from "./errors";

/**
 * Mock provider returning realistic, structured sample data for testing.
 * Always returns value fields wrapped with FieldMetadata.
 * Strictly excludes direct birthdates, SSNs, and exact age metrics (provides ageRange only).
 */
export class MockEnrichmentProvider implements EnrichmentProvider {
  providerName = "mock";
  providerDisplayName = "Simulated Mock Enrichment Provider";
  supportedProducts: DataProductType[] = [
    "PROPERTY_PROFILE",
    "OWNER_CONTACT",
    "ROOF_INTELLIGENCE",
    "FULL_STORM_LEAD",
  ];

  isConfigured(): boolean {
    // Enabled explicitly via mock mode env var, or as fallback in non-production environments
    return (
      process.env.ENRICHMENT_MOCK_MODE === "true" ||
      process.env.NODE_ENV !== "production"
    );
  }

  async enrich(input: EnrichmentProviderInput): Promise<EnrichmentProviderResponse> {
    if (!this.isConfigured()) {
      throw new EnrichmentProviderError(
        "PROVIDER_NOT_CONFIGURED",
        this.providerName,
        "Mock provider is not enabled"
      );
    }

    if (!this.supportedProducts.includes(input.productType)) {
      throw new EnrichmentProviderError(
        "UNSUPPORTED_PRODUCT",
        this.providerName,
        `Product type ${input.productType} is not supported by mock provider`
      );
    }

    const mockRequestId = `mock-req-${Math.random().toString(36).substring(2, 9)}`;
    const nowIso = new Date().toISOString();

    let propertyProfile = undefined;
    let contactData = undefined;
    let roofIntelligence = undefined;

    // 1. PROPERTY_PROFILE mock payload
    if (input.productType === "PROPERTY_PROFILE" || input.productType === "FULL_STORM_LEAD") {
      propertyProfile = {
        yearBuilt: createFieldMetadata(1994, this.providerName, 0.95, nowIso),
        squareFeet: createFieldMetadata(2450, this.providerName, 0.9, nowIso),
        bedrooms: createFieldMetadata(4, this.providerName, 1.0, nowIso),
        bathrooms: createFieldMetadata(2.5, this.providerName, 1.0, nowIso),
        homeValue: createFieldMetadata(385000, this.providerName, 0.85, nowIso),
        lotSize: createFieldMetadata(0.25, this.providerName, 0.9, nowIso),
        foundation: createFieldMetadata("Slab", this.providerName, 0.8, nowIso),
        ownerOccupied: createFieldMetadata(true, this.providerName, 0.9, nowIso),
        mailingAddress: createFieldMetadata(input.address, this.providerName, 1.0, nowIso),
        parcelId: createFieldMetadata("123-456-789-000", this.providerName, 1.0, nowIso),
        county: createFieldMetadata("Mock County", this.providerName, 1.0, nowIso),
        permits: createFieldMetadata(
          [
            { date: "2018-05-14", description: "Roof replacement permit", amount: 12500 },
            { date: "2021-08-22", description: "HVAC system installation", amount: 6200 },
          ],
          this.providerName,
          0.95,
          nowIso
        ),
      };
    }

    // 2. OWNER_CONTACT mock payload
    if (input.productType === "OWNER_CONTACT" || input.productType === "FULL_STORM_LEAD") {
      contactData = {
        firstName: createFieldMetadata("Jane", this.providerName, 0.9, nowIso),
        lastName: createFieldMetadata("Doe", this.providerName, 0.9, nowIso),
        phones: createFieldMetadata(
          [
            {
              number: "555-019-2834",
              type: "mobile" as const,
              dncStatus: false,
              litigatorStatus: false,
              confidence: 0.92,
            },
            {
              number: "555-014-9876",
              type: "landline" as const,
              dncStatus: true,
              litigatorStatus: false,
              confidence: 0.85,
            },
          ],
          this.providerName,
          0.9,
          nowIso
        ),
        emails: createFieldMetadata(
          [
            {
              address: "jane.doe.mock@example.com",
              deliverability: "deliverable" as const,
              confidence: 0.95,
            },
          ],
          this.providerName,
          0.95,
          nowIso
        ),
        ageRange: createFieldMetadata("45-54", this.providerName, 0.8, nowIso),
        mailingAddress: createFieldMetadata(input.address, this.providerName, 1.0, nowIso),
        ownerOccupied: createFieldMetadata(true, this.providerName, 0.9, nowIso),
      };
    }

    // 3. ROOF_INTELLIGENCE mock payload
    if (input.productType === "ROOF_INTELLIGENCE" || input.productType === "FULL_STORM_LEAD") {
      roofIntelligence = {
        roofType: createFieldMetadata("Gable", this.providerName, 0.9, nowIso),
        roofMaterial: createFieldMetadata("Asphalt Shingle", this.providerName, 0.95, nowIso),
        estimatedRoofAge: createFieldMetadata(8, this.providerName, 0.85, nowIso),
        lastRoofPermitDate: createFieldMetadata("2018-05-14", this.providerName, 0.95, nowIso),
        permitSummary: createFieldMetadata("Complete tear-off and reroof under permit 1234-A", this.providerName, 0.9, nowIso),
        imageryProvider: createFieldMetadata("EagleView Sim", this.providerName, 1.0, nowIso),
        confidence: createFieldMetadata(0.92, this.providerName, 0.95, nowIso),
      };
    }

    const data: NormalizedEnrichmentResult = {
      propertyProfile,
      contactData,
      roofIntelligence,
      providerSource: this.providerName,
      providerRequestId: mockRequestId,
      providerCostEstimate: 0,
      productType: input.productType,
      normalizedAt: nowIso,
    };

    return {
      success: true,
      providerSource: this.providerName,
      providerRequestId: mockRequestId,
      providerCostEstimate: 0,
      confidenceScore: 0.95,
      data,
      normalizedAt: new Date(nowIso),
    };
  }
}
export default MockEnrichmentProvider;
