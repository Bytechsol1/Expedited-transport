import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

declare global {
  var __dbClient: ReturnType<typeof postgres> | undefined;
  var __drizzleDb: PostgresJsDatabase<typeof schema> | undefined;
}

function getDb(): PostgresJsDatabase<typeof schema> {
  if (globalThis.__drizzleDb) return globalThis.__drizzleDb;

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set.");
  }

  const client = globalThis.__dbClient ?? postgres(connectionString, { prepare: false });
  const instance = drizzle(client, { schema });

  if (process.env.NODE_ENV !== "production") {
    globalThis.__dbClient = client;
    globalThis.__drizzleDb = instance;
  }

  return instance;
}

// Lazily resolves the real Drizzle instance on first property access, so
// importing this module never requires DATABASE_URL to be set (Next.js
// evaluates route modules during `next build`'s page-data collection step).
export const db: PostgresJsDatabase<typeof schema> = new Proxy({} as PostgresJsDatabase<typeof schema>, {
  get(_target, prop, receiver) {
    return Reflect.get(getDb(), prop, receiver);
  },
});
