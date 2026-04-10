ALTER TABLE "reset_password_tokens" DROP CONSTRAINT "reset_password_tokens_reset_token_unique";--> statement-breakpoint
ALTER TABLE "reset_password_tokens" ALTER COLUMN "reset_token" SET DATA TYPE varchar(10);--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "images" json DEFAULT '[]'::json NOT NULL;--> statement-breakpoint
ALTER TABLE "reset_password_tokens" ADD COLUMN "expires_at" timestamp with time zone NOT NULL;