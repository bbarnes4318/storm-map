import { EnrichmentProvider, EnrichmentProviderInput, EnrichmentProviderResponse } from "./base";
import { DataProductType } from "../schemas";
import { EnrichmentProviderError } from "./errors";

/**
 * Melissa Data contact enrichment provider stub.
 * TODO: Implement real API request handling in Phase 1F.
 */
export class MelissaEnrichmentProvider implements EnrichmentProvider {
  providerName = "melissa";
  providerDisplayName = "Melissa Data Solutions";
  supportedProducts: DataProductType[] = ["OWNER_CONTACT"];

  isConfigured(): boolean {
    return !!(
      process.env.MELISSA_API_KEY &&
      process.env.MELISSA_API_URL
    );
  }

  async enrich(input: EnrichmentProviderInput): Promise<EnrichmentProviderResponse> {
    if (!this.isConfigured()) {
      throw new EnrichmentProviderError(
        "PROVIDER_NOT_CONFIGURED",
        this.providerName,
        "Melissa Provider is not configured (missing credentials)"
      );
    }

    if (!this.supportedProducts.includes(input.productType)) {
      throw new EnrichmentProviderError(
        "UNSUPPORTED_PRODUCT",
        this.providerName,
        `Product type ${input.productType} is not supported by Melissa`
      );
    }

    throw new Error("Melissa integration not fully implemented yet");
  }
}
export default MelissaEnrichmentProvider;
