import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./lib/db/schema/enrichment.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL || "",
  },
  verbose: true,
  strict: true,
});
