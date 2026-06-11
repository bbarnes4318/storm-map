import { EnrichmentProvider, EnrichmentProviderInput, EnrichmentProviderResponse } from "./base";
import { DataProductType } from "../schemas";
import { EnrichmentProviderError } from "./errors";

/**
 * BatchData enrichment provider stub.
 * TODO: Implement real API request handling in Phase 1F.
 */
export class BatchDataEnrichmentProvider implements EnrichmentProvider {
  providerName = "batchdata";
  providerDisplayName = "BatchData API";
  supportedProducts: DataProductType[] = [
    "PROPERTY_PROFILE",
    "OWNER_CONTACT",
    "ROOF_INTELLIGENCE",
    "FULL_STORM_LEAD",
  ];

  isConfigured(): boolean {
    return !!(
      process.env.BATCHDATA_API_KEY &&
      process.env.BATCHDATA_API_URL
    );
  }

  async enrich(input: EnrichmentProviderInput): Promise<EnrichmentProviderResponse> {
    if (!this.isConfigured()) {
      throw new EnrichmentProviderError(
        "PROVIDER_NOT_CONFIGURED",
        this.providerName,
        "BatchData Provider is not configured (missing credentials)"
      );
    }

    if (!this.supportedProducts.includes(input.productType)) {
      throw new EnrichmentProviderError(
        "UNSUPPORTED_PRODUCT",
        this.providerName,
        `Product type ${input.productType} is not supported by BatchData`
      );
    }

    throw new Error("BatchData integration not fully implemented yet");
  }
}
export default BatchDataEnrichmentProvider;
