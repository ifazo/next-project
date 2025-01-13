-- CreateEnum
CREATE TYPE "Status" AS ENUM ('active', 'suspended');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'active';
