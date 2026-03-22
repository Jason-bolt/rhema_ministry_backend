import { pgEnum, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { usersTable } from "./User";

export const sermonResourceTypeEnum = pgEnum("resource_type", [
  "video",
  "audio",
  "article",
]);

export const sermonsTable = pgTable("sermons", {
  id: uuid().primaryKey(),
  title: varchar({ length: 255 }).notNull(),
  speaker: varchar({ length: 255 }).notNull(),
  date: varchar({ length: 255 }).notNull(),
  duration: varchar({ length: 255 }).notNull(),
  resource_type: sermonResourceTypeEnum(),
  resource_url: varchar({ length: 255 }).notNull(),
  added_by: uuid().references(() => usersTable.id),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});
