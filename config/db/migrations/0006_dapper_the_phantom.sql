CREATE TABLE "events" (
	"id" uuid PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"date" varchar(255) NOT NULL,
	"time" varchar(255) NOT NULL,
	"location" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"recurring" boolean DEFAULT false NOT NULL,
	"flier_url" varchar(500) DEFAULT '' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "gallery_groups" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"cover_url" varchar(500) DEFAULT '' NOT NULL,
	"images" json DEFAULT '[]'::json NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "site_texts" (
	"id" uuid PRIMARY KEY NOT NULL,
	"hero_welcome" text DEFAULT '' NOT NULL,
	"hero_title" text DEFAULT '' NOT NULL,
	"hero_subtitle" text DEFAULT '' NOT NULL,
	"mission_title" text DEFAULT '' NOT NULL,
	"mission_text" text DEFAULT '' NOT NULL,
	"about_preview_title" text DEFAULT '' NOT NULL,
	"about_preview_text" text DEFAULT '' NOT NULL,
	"cta_title" text DEFAULT '' NOT NULL,
	"cta_text" text DEFAULT '' NOT NULL
);
