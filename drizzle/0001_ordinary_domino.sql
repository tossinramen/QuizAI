CREATE TABLE IF NOT EXISTS "account" (
	"userId" text NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"provider_account_id" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text,
	CONSTRAINT "account_provider_provider_account_id_pk" PRIMARY KEY("provider","provider_account_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session" (
	"session_token" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text,
	"emailVerified" timestamp,
	"image" text,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "verification_token" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "verification_token_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
DROP TABLE "accounts";--> statement-breakpoint
DROP TABLE "sessions";--> statement-breakpoint
DROP TABLE "users";--> statement-breakpoint
DROP TABLE "verification_tokens";--> statement-breakpoint
ALTER TABLE "quizzes" DROP CONSTRAINT "quizzes_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "quizzes" ADD COLUMN "userId" text DEFAULT null;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "quizzes" ADD CONSTRAINT "quizzes_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "quizzes" DROP COLUMN IF EXISTS "user_id";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
