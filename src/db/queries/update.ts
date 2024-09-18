import { eq } from 'drizzle-orm';
import { db } from '../index';
import { productsTable, SelectProduct } from '../schema';

export async function updateProduct(id: SelectProduct['id'], data: Partial<Omit<SelectProduct, 'id'>>) {
    await db.update(productsTable).set(data).where(eq(productsTable.id, id));
}