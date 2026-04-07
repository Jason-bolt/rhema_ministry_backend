import { boolean, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const eventsTable = pgTable("events", {
  id: uuid().primaryKey(),
  title: varchar({ length: 255 }).notNull(),
  date: varchar({ length: 255 }).notNull(),
  time: varchar({ length: 255 }).notNull(),
  location: varchar({ length: 255 }).notNull(),
  description: text().notNull(),
  recurring: boolean().notNull().default(false),
  flier_url: varchar({ length: 500 }).notNull().default(""),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});
