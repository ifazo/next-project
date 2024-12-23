/*
  Warnings:

  - You are about to drop the column `user_id` on the `reviews` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_email]` on the table `reviews` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_email` to the `reviews` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_user_id_fkey";

-- DropIndex
DROP INDEX "reviews_user_id_key";

-- AlterTable
ALTER TABLE "reviews" DROP COLUMN "user_id",
ADD COLUMN     "user_email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "reviews_user_email_key" ON "reviews"("user_email");

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_user_email_fkey" FOREIGN KEY ("user_email") REFERENCES "users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
