import "dotenv/config";
import { defineConfig } from "drizzle-kit";

if (!process.env.SUPABASE_DB_URL) {
  console.warn("SUPABASE_DB_URL is not set. Drizzle commands may fail until it is configured.");
}

export default defineConfig({
  dialect: "postgresql",
  schema: "./db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.SUPABASE_DB_URL ?? "",
  },
});
