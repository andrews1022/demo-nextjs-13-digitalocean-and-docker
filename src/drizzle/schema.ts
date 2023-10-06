// src/drizzle/schema.ts

import { timestamp, pgTable, text, uuid } from "drizzle-orm/pg-core";

export const notes = pgTable("notes", {
  id: uuid("id").defaultRandom().notNull().primaryKey(),
  name: text("name").notNull(),
  content: text("content").notNull(),
  color: text("color").notNull(),
  created_at: timestamp("created_at").notNull().defaultNow()
});
