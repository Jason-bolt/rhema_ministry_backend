ALTER TABLE "sermons" DROP CONSTRAINT "sermons_add_by_users_id_fk";
--> statement-breakpoint
ALTER TABLE "sermons" ADD COLUMN "added_by" uuid;--> statement-breakpoint
ALTER TABLE "sermons" ADD CONSTRAINT "sermons_added_by_users_id_fk" FOREIGN KEY ("added_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sermons" DROP COLUMN "add_by";