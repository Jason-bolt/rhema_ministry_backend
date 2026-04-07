import { json, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const galleryGroupsTable = pgTable("gallery_groups", {
  id: uuid().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  cover_url: varchar({ length: 500 }).notNull().default(""),
  images: json("images").$type<string[]>().notNull().default([]),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});
