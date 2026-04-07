import { pgTable, text, uuid } from "drizzle-orm/pg-core";

// Single-row table — always upserted with SITE_TEXTS_ID
export const SITE_TEXTS_ID = "00000000-0000-0000-0000-000000000001";

export const siteTextsTable = pgTable("site_texts", {
  id: uuid().primaryKey(),
  hero_welcome: text().notNull().default(""),
  hero_title: text().notNull().default(""),
  hero_subtitle: text().notNull().default(""),
  mission_title: text().notNull().default(""),
  mission_text: text().notNull().default(""),
  about_preview_title: text().notNull().default(""),
  about_preview_text: text().notNull().default(""),
  cta_title: text().notNull().default(""),
  cta_text: text().notNull().default(""),
});
