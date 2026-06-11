import { EnrichmentProvider, EnrichmentProviderInput, EnrichmentProviderResponse } from "./base";
import { DataProductType } from "../schemas";
import { EnrichmentProviderError } from "./errors";

/**
 * Trestle (formerly RealValidation) enrichment provider stub.
 * TODO: Implement real API request handling in Phase 1F.
 */
export class TrestleEnrichmentProvider implements EnrichmentProvider {
  providerName = "trestle";
  providerDisplayName = "Trestle Contact Solutions";
  supportedProducts: DataProductType[] = ["OWNER_CONTACT"];

  isConfigured(): boolean {
    return !!(
      process.env.TRESTLE_API_KEY &&
      process.env.TRESTLE_API_URL
    );
  }

  async enrich(input: EnrichmentProviderInput): Promise<EnrichmentProviderResponse> {
    if (!this.isConfigured()) {
      throw new EnrichmentProviderError(
        "PROVIDER_NOT_CONFIGURED",
        this.providerName,
        "Trestle Provider is not configured (missing credentials)"
      );
    }

    if (!this.supportedProducts.includes(input.productType)) {
      throw new EnrichmentProviderError(
        "UNSUPPORTED_PRODUCT",
        this.providerName,
        `Product type ${input.productType} is not supported by Trestle`
      );
    }

    throw new Error("Trestle integration not fully implemented yet");
  }
}
export default TrestleEnrichmentProvider;
