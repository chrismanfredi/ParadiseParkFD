import "server-only";
import { drizzle } from "drizzle-orm/node-postgres";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

type DrizzleDb = NodePgDatabase<typeof schema>;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      __drizzlePgPool?: Pool;
      __drizzleDb?: DrizzleDb;
    }
  }
}

const connectionString = process.env.SUPABASE_DB_URL;

if (!connectionString) {
  throw new Error("SUPABASE_DB_URL is not set. Please update your .env file.");
}

const pool =
  globalThis.__drizzlePgPool ??
  new Pool({
    connectionString,
    max: 5,
  });

const db: DrizzleDb = globalThis.__drizzleDb ?? drizzle(pool, { schema });

if (process.env.NODE_ENV !== "production") {
  globalThis.__drizzlePgPool = pool;
  globalThis.__drizzleDb = db;
}

export { db, pool, schema };
