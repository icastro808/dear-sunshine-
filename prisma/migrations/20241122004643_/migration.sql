/*
  Warnings:

  - You are about to drop the column `firstName` on the `Letter` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Letter` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Letter" DROP COLUMN "firstName",
DROP COLUMN "lastName";
