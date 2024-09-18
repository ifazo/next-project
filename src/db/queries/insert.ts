import { db } from '../index';
import { InsertProduct, InsertReview, InsertUser, productsTable, reviewsTable, usersTable } from '../schema';

export async function createUser(data: InsertUser) {
    await db.insert(usersTable).values(data);
}

export async function createProduct(data: InsertProduct) {
    await db.insert(productsTable).values(data);
}

export async function createReview(data: InsertReview) {
    await db.insert(reviewsTable).values(data);
}