import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { users } from "./user";
import { bots } from "./bot";

export const conversations = sqliteTable("conversations", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  botId: integer("botId")
    .notNull()
    .references(() => bots.id, { onDelete: "cascade" }),
  title: text("title").notNull().default("New Conversation"),
  createdAt: integer("createdAt", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: integer("updatedAt", { mode: "timestamp" })
    .$onUpdate(() => sql`(unixepoch())`)
    .notNull()
    .default(sql`(unixepoch())`),
});
