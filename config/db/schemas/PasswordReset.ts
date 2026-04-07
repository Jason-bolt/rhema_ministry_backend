import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { usersTable } from "./User";

export const resetPasswordTokensTable = pgTable("reset_password_tokens", {
  user_id: uuid()
    .references(() => usersTable.id)
    .primaryKey(),
  reset_token: varchar({ length: 10 }).notNull(),
  expires_at: timestamp("expires_at", { withTimezone: true, mode: "date" })
    .notNull(),
  created_at: timestamp("created_at", { withTimezone: true, mode: "date" })
    .notNull()
    .defaultNow(),
});
