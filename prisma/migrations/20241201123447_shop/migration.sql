/*
  Warnings:

  - You are about to drop the column `available` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `category_name` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `features` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `products` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `products` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `stores` will be added. If there are existing duplicate values, this will fail.
  - Made the column `image` on table `categories` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `category_slug` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shop_name` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stock` to the `products` table without a default value. This is not possible if the table is not empty.
  - Made the column `logo` on table `stores` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_category_name_fkey";

-- DropIndex
DROP INDEX "categories_name_key";

-- AlterTable
ALTER TABLE "categories" ALTER COLUMN "image" SET NOT NULL;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "available",
DROP COLUMN "category_name",
DROP COLUMN "features",
DROP COLUMN "title",
ADD COLUMN     "category_slug" TEXT NOT NULL,
ADD COLUMN     "colors" TEXT[],
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "shop_name" TEXT NOT NULL,
ADD COLUMN     "specifications" TEXT[],
ADD COLUMN     "stock" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "stores" ALTER COLUMN "logo" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "password" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "products_name_key" ON "products"("name");

-- CreateIndex
CREATE UNIQUE INDEX "stores_name_key" ON "stores"("name");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_shop_name_fkey" FOREIGN KEY ("shop_name") REFERENCES "stores"("name") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_category_slug_fkey" FOREIGN KEY ("category_slug") REFERENCES "categories"("slug") ON DELETE NO ACTION ON UPDATE NO ACTION;
