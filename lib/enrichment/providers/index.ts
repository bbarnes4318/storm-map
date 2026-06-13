import { EnrichmentProvider } from "./base";
import { DataProductType } from "../schemas";
import { MockEnrichmentProvider } from "./mock";
import { AttomEnrichmentProvider } from "./attom";
import { BatchDataEnrichmentProvider } from "./batchdata";
import { TrestleEnrichmentProvider } from "./trestle";
import { MelissaEnrichmentProvider } from "./melissa";
import { EagleViewEnrichmentProvider } from "./eagleview";
import { EnrichmentProviderError } from "./errors";

// Instantiate all provider interfaces
const mockProvider = new MockEnrichmentProvider();
const attomProvider = new AttomEnrichmentProvider();
const batchDataProvider = new BatchDataEnrichmentProvider();
const trestleProvider = new TrestleEnrichmentProvider();
const melissaProvider = new MelissaEnrichmentProvider();
const eagleViewProvider = new EagleViewEnrichmentProvider();

const providersList: EnrichmentProvider[] = [
  mockProvider,
  attomProvider,
  batchDataProvider,
  trestleProvider,
  melissaProvider,
  eagleViewProvider,
];

/**
 * Returns the resolved provider for a given data product type based on configuration state and routing priority.
 */
export function getProviderForProduct(productType: DataProductType): EnrichmentProvider {
  // 1. If mock mode is explicitly turned on, always return mock provider if enabled
  if (process.env.ENRICHMENT_MOCK_MODE === "true" && mockProvider.isConfigured()) {
    return mockProvider;
  }

  // 2. Define routing priorities per product type (preferred -> fallbacks)
  let routingChain: EnrichmentProvider[] = [];

  switch (productType) {
    case "PROPERTY_PROFILE":
      routingChain = [attomProvider, batchDataProvider, mockProvider];
      break;
    case "OWNER_CONTACT":
      routingChain = [melissaProvider, batchDataProvider, trestleProvider, mockProvider];
      break;
    case "ROOF_INTELLIGENCE":
      routingChain = [eagleViewProvider, batchDataProvider, attomProvider, mockProvider];
      break;
    case "FULL_STORM_LEAD":
      // Full composed bundle — try melissa for contact, then fall back to mock
      routingChain = [melissaProvider, mockProvider];
      break;
    default:
      throw new EnrichmentProviderError(
        "UNSUPPORTED_PRODUCT",
        "registry",
        `Unknown or unsupported product type: ${productType}`
      );
  }

  // 3. Find first configured provider in priority chain
  const resolvedProvider = routingChain.find((provider) => provider.isConfigured());

  if (!resolvedProvider) {
    throw new EnrichmentProviderError(
      "PROVIDER_NOT_CONFIGURED",
      "registry",
      `No configured providers available to handle product type: ${productType}`
    );
  }

  return resolvedProvider;
}

export * from "./base";
export * from "./errors";
export * from "./mock";
export * from "./normalizers";
export * from "./attom";
export * from "./batchdata";
export * from "./trestle";
export * from "./melissa";
export * from "./eagleview";
