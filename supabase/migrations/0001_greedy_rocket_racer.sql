CREATE TABLE IF NOT EXISTS "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"price" varchar(10) NOT NULL,
	"category" varchar(100) NOT NULL,
	"images" json NOT NULL,
	"colors" json NOT NULL,
	"sizes" json NOT NULL,
	"description" text NOT NULL,
	"highlights" json NOT NULL,
	"details" text NOT NULL
);
