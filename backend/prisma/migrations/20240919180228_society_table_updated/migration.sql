/*
  Warnings:

  - Added the required column `address` to the `Society` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Society" ADD COLUMN     "address" TEXT NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'active';
