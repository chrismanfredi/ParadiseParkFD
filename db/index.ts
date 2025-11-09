import "server-only";
import { drizzle } from "drizzle-orm/node-postgres";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

type DrizzleDb = NodePgDatabase<typeof schema>;

declare global {
  const __drizzlePgPool: Pool | undefined;
  const __drizzleDb: DrizzleDb | undefined;
}

const connectionString = process.env.SUPABASE_DB_URL;

if (!connectionString) {
  throw new Error("SUPABASE_DB_URL is not set. Please update your .env file.");
}

const globalWithDrizzle = globalThis as typeof globalThis & {
  __drizzlePgPool?: Pool;
  __drizzleDb?: DrizzleDb;
};

const pool =
  globalWithDrizzle.__drizzlePgPool ??
  new Pool({
    connectionString,
    max: 5,
  });

const db: DrizzleDb = globalWithDrizzle.__drizzleDb ?? drizzle(pool, { schema });

if (process.env.NODE_ENV !== "production") {
  globalWithDrizzle.__drizzlePgPool = pool;
  globalWithDrizzle.__drizzleDb = db;
}

export { db, pool, schema };
