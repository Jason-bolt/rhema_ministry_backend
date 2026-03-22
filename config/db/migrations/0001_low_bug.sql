CREATE TYPE "public"."resource_type" AS ENUM('video', 'audio', 'article');--> statement-breakpoint
CREATE TABLE "sermons" (
	"id" uuid PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"speaker" varchar(255) NOT NULL,
	"date" varchar(255) NOT NULL,
	"duration" varchar(255) NOT NULL,
	"resource_type" "resource_type",
	"resourc_url" varchar(255),
	"add_by" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "sermons" ADD CONSTRAINT "sermons_add_by_users_id_fk" FOREIGN KEY ("add_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;