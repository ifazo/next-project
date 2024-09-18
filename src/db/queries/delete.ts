import { eq } from 'drizzle-orm';
import { db } from '../index';
import { productsTable, SelectProduct, SelectUser, usersTable } from '../schema';

export async function deleteUser(id: SelectUser['id']) {
    await db.delete(usersTable).where(eq(usersTable.id, id));
}

export async function deleteProduct(id: SelectProduct['id']) {
    await db.delete(productsTable).where(eq(productsTable.id, id));
}