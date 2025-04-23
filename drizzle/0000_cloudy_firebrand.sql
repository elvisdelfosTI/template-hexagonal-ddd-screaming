-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "Author" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"name" text NOT NULL,
	"password" text NOT NULL,
	"age" integer NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Book" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"publishedDate" timestamp(3) NOT NULL,
	"pagesCount" integer NOT NULL,
	"ISBN" text NOT NULL,
	"authorId" integer NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "Book" ADD CONSTRAINT "Book_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."Author"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
CREATE UNIQUE INDEX "Author_email_key" ON "Author" USING btree ("email" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "Book_ISBN_key" ON "Book" USING btree ("ISBN" text_ops);
*/