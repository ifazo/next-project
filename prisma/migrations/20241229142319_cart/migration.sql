/*
  Warnings:

  - You are about to drop the column `order_id` on the `order_products` table. All the data in the column will be lost.
  - Added the required column `category_slug` to the `order_products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `order_products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "order_products" DROP CONSTRAINT "order_products_order_id_fkey";

-- DropForeignKey
ALTER TABLE "order_products" DROP CONSTRAINT "order_products_shop_name_fkey";

-- AlterTable
ALTER TABLE "order_products" DROP COLUMN "order_id",
ADD COLUMN     "category_slug" TEXT NOT NULL,
ADD COLUMN     "orderId" TEXT,
ADD COLUMN     "product_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "order_products" ADD CONSTRAINT "order_products_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;
