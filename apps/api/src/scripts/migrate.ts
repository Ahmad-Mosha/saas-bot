import { migrate } from "drizzle-orm/bun-sqlite/migrator";
import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";

// Create a database connection
const sqlite = new Database("sqlite.db");
const db = drizzle(sqlite);

// This will run all pending migrations
async function main() {
  console.log("Running migrations...");

  await migrate(db, { migrationsFolder: "./migrations" });

  console.log("Migrations complete!");
  process.exit(0);
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
