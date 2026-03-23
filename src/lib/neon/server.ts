import { neon } from "@neondatabase/serverless";

let sqlClient: ReturnType<typeof neon> | null | undefined;

export function getNeonSql() {
  if (sqlClient !== undefined) {
    return sqlClient;
  }

  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    sqlClient = null;
    return sqlClient;
  }

  sqlClient = neon(databaseUrl);
  return sqlClient;
}
