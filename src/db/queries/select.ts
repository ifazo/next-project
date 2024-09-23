import { eq } from 'drizzle-orm';
import { db } from '../index';
import { productsTable, SelectProduct, SelectUser, usersTable } from '../schema';

export async function getProducts(): Promise<SelectProduct[]> {
    return db.select().from(productsTable);
}

export async function getProductById(id: SelectProduct['id']): Promise<SelectProduct[]> {
    return db.select().from(productsTable).where(eq(productsTable.id, id));
}

export async function getUsers(): Promise<SelectUser[]> {
    return db.select().from(usersTable);
}

export async function getUserById(id: SelectUser['id']): Promise<SelectUser[]> {
    return db.select().from(usersTable).where(eq(usersTable.id, id));
}

