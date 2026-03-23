import { pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";

export const contactFormTable = pgTable("contact_form", {
  id: uuid().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull(),
  subject: varchar({ length: 255 }).notNull(),
  message: text().notNull(),
});
