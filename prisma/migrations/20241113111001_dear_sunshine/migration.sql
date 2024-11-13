/*
  Warnings:

  - Made the column `text` on table `Letter` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Letter" ALTER COLUMN "text" SET NOT NULL;
