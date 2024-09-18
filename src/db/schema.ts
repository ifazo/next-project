import { integer, json, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users_table', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    age: integer('age').notNull(),
    email: text('email').notNull().unique(),
});

export const productsTable = pgTable("products_table", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    price: integer("price").notNull(),
    category: varchar("category", { length: 100 }).notNull(),
    images: json("images").notNull(), // Storing the array of images as JSON
    colors: json("colors").notNull(), // Storing the colors array as JSON
    sizes: json("sizes").notNull(), // Storing the sizes array as JSON
    description: text("description").notNull(),
    highlights: json("highlights").notNull(), // Storing highlights as JSON
    details: text("details").notNull(),
});


export const reviewsTable = pgTable('reviews_table', {
    id: serial('id').primaryKey(),
    rating: integer('rating').notNull(),
    title: text('title').notNull(),
    content: text('content').notNull(),
    userId: integer('user_id')
        .notNull()
        .references(() => usersTable.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
        .notNull()
        .$onUpdate(() => new Date()),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertProduct = typeof productsTable.$inferInsert;
export type SelectProduct = typeof productsTable.$inferSelect;

export type InsertReview = typeof reviewsTable.$inferInsert;
export type SelectReview = typeof reviewsTable.$inferSelect;
