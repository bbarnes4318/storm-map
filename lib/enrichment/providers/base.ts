import { DataProductType, NormalizedEnrichmentResult } from "../schemas";

export interface EnrichmentProviderInput {
  productType: DataProductType;
  address: string;
  latitude: number;
  longitude: number;
  propertyHash?: string;
  accountId?: string;
  requestId?: string;
}

export interface EnrichmentProviderResponse {
  success: boolean;
  providerSource: string;
  providerRequestId?: string;
  providerCostEstimate?: number;
  confidenceScore: number;
  data?: NormalizedEnrichmentResult;
  error?: string;
  fromCache?: boolean;
  normalizedAt: Date;
}

export interface EnrichmentProvider {
  providerName: string;
  providerDisplayName: string;
  isConfigured(): boolean;
  supportedProducts: DataProductType[];
  enrich(input: EnrichmentProviderInput): Promise<EnrichmentProviderResponse>;
}
