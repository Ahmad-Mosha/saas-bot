import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { users } from "./user";

export const bots = sqliteTable("bots", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  description: text("description").notNull(),
  botType: text("botType", { enum: ["chat", "image", "code"] })
    .notNull()
    .default("chat"),
  promptInstructions: text("promptInstructions"),
  integrationType: text("integrationType", { enum: ["icon", "page"] })
    .notNull()
    .default("icon"),
  enableHistory: integer("enableHistory", { mode: "boolean" }).default(false),
  createdAt: integer("createdAt", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: integer("updatedAt", { mode: "timestamp" })
    .$onUpdate(() => sql`(unixepoch())`)
    .notNull()
    .default(sql`(unixepoch())`),
});
