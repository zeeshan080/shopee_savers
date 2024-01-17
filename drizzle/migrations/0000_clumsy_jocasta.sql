CREATE TABLE IF NOT EXISTS "blog" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"content" text NOT NULL,
	"image" text NOT NULL,
	"created_at" date NOT NULL,
	"updated_at" date NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "category" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"created_at" date NOT NULL,
	"updated_at" date NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "coupon" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"tagline" text NOT NULL,
	"description" text NOT NULL,
	"expire_date" date NOT NULL,
	"used_times" numeric NOT NULL,
	"discount_number" numeric NOT NULL,
	"exclusive" boolean NOT NULL,
	"link" text NOT NULL,
	"discountId" serial NOT NULL,
	"storeId" serial NOT NULL,
	"subCategoryId" serial NOT NULL,
	"created_at" date NOT NULL,
	"updated_at" date NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "directory" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "discount" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"created_at" date NOT NULL,
	"updated_at" date NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "store" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"about" text NOT NULL,
	"url" text NOT NULL,
	"shipping" text NOT NULL,
	"lpCode" text NOT NULL,
	"trafficCode" text NOT NULL,
	"logo" text NOT NULL,
	"popular" boolean NOT NULL,
	"favorite" boolean NOT NULL,
	"favoriteImage" text,
	"created_at" date NOT NULL,
	"updated_at" date NOT NULL,
	"directoryId" serial NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "subCategory" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"created_at" date NOT NULL,
	"updated_at" date NOT NULL,
	"categoryId" serial NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "coupon" ADD CONSTRAINT "coupon_discountId_discount_id_fk" FOREIGN KEY ("discountId") REFERENCES "discount"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "coupon" ADD CONSTRAINT "coupon_storeId_store_id_fk" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "coupon" ADD CONSTRAINT "coupon_subCategoryId_subCategory_id_fk" FOREIGN KEY ("subCategoryId") REFERENCES "subCategory"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "store" ADD CONSTRAINT "store_directoryId_directory_id_fk" FOREIGN KEY ("directoryId") REFERENCES "directory"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "subCategory" ADD CONSTRAINT "subCategory_categoryId_category_id_fk" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
