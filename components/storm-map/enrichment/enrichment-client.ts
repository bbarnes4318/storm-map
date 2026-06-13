import { 
  DataProductType, 
  QuoteRequest, 
  QuoteResponse, 
  UnlockResponse 
} from "@/lib/enrichment/schemas";

export interface ApiErrorResponse {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export class EnrichmentApiError extends Error {
  code: string;
  status: number;
  details?: Record<string, unknown>;

  constructor(code: string, message: string, status: number, details?: Record<string, unknown>) {
    super(message);
    this.name = "EnrichmentApiError";
    this.code = code;
    this.status = status;
    this.details = details;
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  const isJson = response.headers.get("content-type")?.includes("application/json");
  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    // Server format: { ok: false, error: "CODE_STRING", message: "...", details?: {} }
    const code = (typeof data?.error === "string" ? data.error : data?.error?.code) || "HTTP_ERROR";
    const message = data?.message || (typeof data?.error === "object" ? data?.error?.message : null) || response.statusText || "An unexpected error occurred.";
    const details = data?.details || (typeof data?.error === "object" ? data?.error?.details : undefined);
    throw new EnrichmentApiError(code, message, response.status, details);
  }

  if (data && data.ok === false) {
    const code = (typeof data.error === "string" ? data.error : data.error?.code) || "API_ERROR";
    const message = data.message || (typeof data.error === "object" ? data.error?.message : null) || "API request failed.";
    const details = data.details || (typeof data.error === "object" ? data.error?.details : undefined);
    throw new EnrichmentApiError(code, message, response.status, details);
  }

  return data?.data as T;
}

export async function attest(agree: boolean): Promise<{ attested: boolean; attestation: { id: string } }> {
  const response = await fetch("/storm-map/api/enrichment/attest", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ agree }),
  });
  return handleResponse(response);
}

export async function getQuote(payload: QuoteRequest): Promise<QuoteResponse> {
  const response = await fetch("/storm-map/api/enrichment/quote", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return handleResponse(response);
}

export async function unlockLead(quoteId: string, idempotencyKey: string): Promise<UnlockResponse> {
  const response = await fetch("/storm-map/api/enrichment/unlock", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Idempotency-Key": idempotencyKey,
    },
    body: JSON.stringify({ quoteId }),
  });
  return handleResponse(response);
}

export interface UnlockedDataDetailResponse {
  unlockId: string;
  productType: DataProductType;
  creditsCharged: number;
  addressText: string;
  latitude: number;
  longitude: number;
  providerSource: string;
  propertyProfile: Record<string, any> | null;
  roofIntelligence: Record<string, any> | null;
  contactData: Record<string, any> | null;
  createdAt: string;
}

export async function getUnlockedLeadData(unlockId: string): Promise<UnlockedDataDetailResponse> {
  const response = await fetch(`/storm-map/api/enrichment/unlocked-data?unlockId=${encodeURIComponent(unlockId)}`, {
    method: "GET",
  });
  return handleResponse<UnlockedDataDetailResponse>(response);
}

export interface CollectRadiusLeadsResponse {
  addedCount: number;
  leads: any[];
  providerStatus: string;
}

export async function collectRadiusLeads(
  centerLat: number,
  centerLon: number,
  radiusMiles: number,
  opportunityId: string
): Promise<CollectRadiusLeadsResponse> {
  const response = await fetch("/storm-map/api/enrichment/radius-leads", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ centerLat, centerLon, radiusMiles, opportunityId }),
  });
  return handleResponse<CollectRadiusLeadsResponse>(response);
}
