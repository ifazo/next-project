/*
  Warnings:

  - The `status` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'active';

-- AlterTable
ALTER TABLE "shops" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'active';

-- AlterTable
ALTER TABLE "users" DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'active';
