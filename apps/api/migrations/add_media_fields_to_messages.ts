import { db } from "../src/config/db";
import { sql } from "drizzle-orm";

async function main() {
  console.log("Running migration: Add media fields to messages table");

  try {
    // Add mediaType column with default value 'none'
    await db.run(
      sql`ALTER TABLE messages ADD COLUMN mediaType TEXT DEFAULT 'none'`
    );
    console.log("Added mediaType column");

    // Add mediaUrl column
    await db.run(sql`ALTER TABLE messages ADD COLUMN mediaUrl TEXT`);
    console.log("Added mediaUrl column");

    console.log("Migration completed successfully");
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Unhandled error:", err);
    process.exit(1);
  });
