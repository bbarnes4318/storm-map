import { z } from "zod";

// ==============================================================================
// 1. Core Enumerations
// ==============================================================================

export const DataProductTypeSchema = z.enum([
  "PROPERTY_PROFILE",
  "OWNER_CONTACT",
  "ROOF_INTELLIGENCE",
  "FULL_STORM_LEAD",
]);

export type DataProductType = z.infer<typeof DataProductTypeSchema>;

export const CreditTransactionTypeSchema = z.enum([
  "BUY_CREDITS",
  "SPEND_CREDITS",
  "REFUND_CREDITS",
  "VOID_CREDITS",
]);

export type CreditTransactionType = z.infer<typeof CreditTransactionTypeSchema>;

// ==============================================================================
// 2. Generic Metadata Pattern
// ==============================================================================

export function createFieldMetadataSchema<T extends z.ZodTypeAny>(valueSchema: T) {
  return z.object({
    value: valueSchema,
    source: z.string(),
    confidence: z.number().min(0).max(1),
    lastUpdated: z.string().datetime(), // ISO 8601 string
  });
}

export interface FieldMetadata<T> {
  value: T;
  source: string;
  confidence: number;
  lastUpdated: string;
}

// ==============================================================================
// 3. Property Profile Schema
// ==============================================================================

export const PermitSchema = z.object({
  date: z.string(),
  description: z.string(),
  amount: z.number().optional(),
});

export type Permit = z.infer<typeof PermitSchema>;

export const NormalizedPropertyProfileSchema = z.object({
  yearBuilt: createFieldMetadataSchema(z.number()).optional(),
  squareFeet: createFieldMetadataSchema(z.number()).optional(),
  bedrooms: createFieldMetadataSchema(z.number()).optional(),
  bathrooms: createFieldMetadataSchema(z.number()).optional(),
  homeValue: createFieldMetadataSchema(z.number()).optional(), // AVM value
  lotSize: createFieldMetadataSchema(z.number()).optional(),
  foundation: createFieldMetadataSchema(z.string()).optional(),
  ownerOccupied: createFieldMetadataSchema(z.boolean()).optional(),
  mailingAddress: createFieldMetadataSchema(z.string()).optional(),
  parcelId: createFieldMetadataSchema(z.string()).optional(),
  county: createFieldMetadataSchema(z.string()).optional(),
  permits: createFieldMetadataSchema(z.array(PermitSchema)).optional(),
});

export type NormalizedPropertyProfile = z.infer<typeof NormalizedPropertyProfileSchema>;

// ==============================================================================
// 4. Owner Contact Schema
// ==============================================================================

export const PhoneEntrySchema = z.object({
  number: z.string(),
  type: z.enum(["mobile", "landline", "voip", "unknown"]),
  dncStatus: z.boolean(),
  litigatorStatus: z.boolean(),
  confidence: z.number().min(0).max(1).optional(),
});

export type PhoneEntry = z.infer<typeof PhoneEntrySchema>;

export const EmailEntrySchema = z.object({
  address: z.string().email(),
  deliverability: z.enum(["deliverable", "undeliverable", "unknown"]),
  confidence: z.number().min(0).max(1).optional(),
});

export type EmailEntry = z.infer<typeof EmailEntrySchema>;

export const NormalizedContactDataSchema = z.object({
  firstName: createFieldMetadataSchema(z.string()).optional(),
  lastName: createFieldMetadataSchema(z.string()).optional(),
  phones: createFieldMetadataSchema(z.array(PhoneEntrySchema)).optional(),
  emails: createFieldMetadataSchema(z.array(EmailEntrySchema)).optional(),
  ageRange: createFieldMetadataSchema(z.string()).optional(), // Strictly age range (e.g. '55-64'). Exact age / DOB / SSN excluded.
  mailingAddress: createFieldMetadataSchema(z.string()).optional(),
  ownerOccupied: createFieldMetadataSchema(z.boolean()).optional(),
});

export type NormalizedContactData = z.infer<typeof NormalizedContactDataSchema>;

// ==============================================================================
// 5. Roof Intelligence Schema
// ==============================================================================

export const NormalizedRoofIntelligenceSchema = z.object({
  roofType: createFieldMetadataSchema(z.string()).optional(),
  roofMaterial: createFieldMetadataSchema(z.string()).optional(),
  estimatedRoofAge: createFieldMetadataSchema(z.number()).optional(),
  lastRoofPermitDate: createFieldMetadataSchema(z.string()).optional(),
  permitSummary: createFieldMetadataSchema(z.string()).optional(),
  imageryProvider: createFieldMetadataSchema(z.string()).optional(),
  confidence: createFieldMetadataSchema(z.number()).optional(),
});

export type NormalizedRoofIntelligence = z.infer<typeof NormalizedRoofIntelligenceSchema>;

// ==============================================================================
// 6. Unified Normalized Result
// ==============================================================================

export const NormalizedEnrichmentResultSchema = z.object({
  propertyProfile: NormalizedPropertyProfileSchema.optional(),
  contactData: NormalizedContactDataSchema.optional(),
  roofIntelligence: NormalizedRoofIntelligenceSchema.optional(),
  providerSource: z.string(),
  providerRequestId: z.string().optional(),
  providerCostEstimate: z.number().optional(),
  productType: DataProductTypeSchema,
  normalizedAt: z.string().datetime(),
});

export type NormalizedEnrichmentResult = z.infer<typeof NormalizedEnrichmentResultSchema>;

// ==============================================================================
// 7. Request & Response Schemas
// ==============================================================================

// Compliance Attestation
export const ComplianceAttestationRequestSchema = z.object({
  agree: z.literal(true),
});

export type ComplianceAttestationRequest = z.infer<typeof ComplianceAttestationRequestSchema>;

// Quote Request & Response
export const QuoteRequestSchema = z.object({
  address: z.string().min(5),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  productType: DataProductTypeSchema,
});

export type QuoteRequest = z.infer<typeof QuoteRequestSchema>;

export const QuoteResponseSchema = z.object({
  quoteId: z.string().uuid(),
  creditCost: z.number().nonnegative(),
  productType: DataProductTypeSchema,
  expiresAt: z.string().datetime(),
});

export type QuoteResponse = z.infer<typeof QuoteResponseSchema>;

// Unlock Request & Response
export const UnlockRequestSchema = z.object({
  quoteId: z.string().uuid(),
});

export type UnlockRequest = z.infer<typeof UnlockRequestSchema>;

export const UnlockResponseSchema = z.object({
  unlockId: z.string().uuid(),
  productType: DataProductTypeSchema,
  creditsCharged: z.number().nonnegative(),
  isCached: z.boolean(),
  propertyProfile: NormalizedPropertyProfileSchema.optional(),
  contactData: NormalizedContactDataSchema.optional(), // Only included if unlocked and decrypted on server
  roofIntelligence: NormalizedRoofIntelligenceSchema.optional(),
});

export type UnlockResponse = z.infer<typeof UnlockResponseSchema>;
