import { EnrichmentProvider, EnrichmentProviderInput, EnrichmentProviderResponse } from "./base";
import { DataProductType } from "../schemas";
import { EnrichmentProviderError } from "./errors";

/**
 * ATTOM Data Solutions property enrichment provider stub.
 * TODO: Implement real API request handling in Phase 1F.
 */
export class AttomEnrichmentProvider implements EnrichmentProvider {
  providerName = "attom";
  providerDisplayName = "ATTOM Data Solutions";
  supportedProducts: DataProductType[] = ["PROPERTY_PROFILE", "ROOF_INTELLIGENCE"];

  isConfigured(): boolean {
    // Requires ATTOM API key and endpoint env variables to be active
    return !!(
      process.env.ATTOM_API_KEY &&
      process.env.ATTOM_API_URL
    );
  }

  async enrich(input: EnrichmentProviderInput): Promise<EnrichmentProviderResponse> {
    if (!this.isConfigured()) {
      throw new EnrichmentProviderError(
        "PROVIDER_NOT_CONFIGURED",
        this.providerName,
        "ATTOM Provider is not configured (missing credentials)"
      );
    }

    if (!this.supportedProducts.includes(input.productType)) {
      throw new EnrichmentProviderError(
        "UNSUPPORTED_PRODUCT",
        this.providerName,
        `Product type ${input.productType} is not supported by ATTOM`
      );
    }

    // Placeholder until real API client integration is added in Phase 1F
    throw new Error("ATTOM integration not fully implemented yet");
  }
}
export default AttomEnrichmentProvider;
