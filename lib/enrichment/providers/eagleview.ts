import { EnrichmentProvider, EnrichmentProviderInput, EnrichmentProviderResponse } from "./base";
import { DataProductType } from "../schemas";
import { EnrichmentProviderError } from "./errors";

/**
 * EagleView roof measurement provider stub.
 * TODO: Implement real API request handling in Phase 1F.
 */
export class EagleViewEnrichmentProvider implements EnrichmentProvider {
  providerName = "eagleview";
  providerDisplayName = "EagleView Roof Measurement API";
  supportedProducts: DataProductType[] = ["ROOF_INTELLIGENCE"];

  isConfigured(): boolean {
    return !!(
      process.env.EAGLEVIEW_API_KEY &&
      process.env.EAGLEVIEW_API_URL
    );
  }

  async enrich(input: EnrichmentProviderInput): Promise<EnrichmentProviderResponse> {
    if (!this.isConfigured()) {
      throw new EnrichmentProviderError(
        "PROVIDER_NOT_CONFIGURED",
        this.providerName,
        "EagleView Provider is not configured (missing credentials)"
      );
    }

    if (!this.supportedProducts.includes(input.productType)) {
      throw new EnrichmentProviderError(
        "UNSUPPORTED_PRODUCT",
        this.providerName,
        `Product type ${input.productType} is not supported by EagleView`
      );
    }

    throw new Error("EagleView integration not fully implemented yet");
  }
}
export default EagleViewEnrichmentProvider;
