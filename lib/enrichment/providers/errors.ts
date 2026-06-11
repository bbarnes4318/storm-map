export type EnrichmentProviderErrorCode =
  | "PROVIDER_NOT_CONFIGURED"
  | "PROVIDER_TIMEOUT"
  | "PROVIDER_RATE_LIMITED"
  | "PROVIDER_AUTH_FAILED"
  | "PROVIDER_BAD_RESPONSE"
  | "PROVIDER_NO_MATCH"
  | "PROVIDER_PARTIAL_MATCH"
  | "PROVIDER_UNKNOWN_ERROR"
  | "UNSUPPORTED_PRODUCT";

export class EnrichmentProviderError extends Error {
  code: EnrichmentProviderErrorCode;
  providerName: string;
  statusCode?: number;

  constructor(
    code: EnrichmentProviderErrorCode,
    providerName: string,
    message: string,
    statusCode?: number
  ) {
    super(message);
    this.name = "EnrichmentProviderError";
    this.code = code;
    this.providerName = providerName;
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, EnrichmentProviderError.prototype);
  }
}
