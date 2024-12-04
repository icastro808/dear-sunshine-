/*
  Warnings:

  - Made the column `signature` on table `Letter` required. This step will fail if there are existing NULL values in that column.
  - Made the column `signature` on table `Reply` required. This step will fail if there are existing NULL values in that column.
  - Made the column `signature` on table `User` required. This step will fail if there are existing NULL values in that column.

*/

-- Step 1: Update existing NULL signature values to 'Sunshine' for all affected tables

UPDATE "Letter" SET "signature" = 'Sunshine' WHERE "signature" IS NULL;
UPDATE "Reply" SET "signature" = 'Sunshine' WHERE "signature" IS NULL;
UPDATE "User" SET "signature" = 'Sunshine' WHERE "signature" IS NULL;

-- Step 2: Alter columns to make them NOT NULL and set default 'Sunshine'

ALTER TABLE "Letter" ALTER COLUMN "signature" SET NOT NULL;
ALTER TABLE "Letter" ALTER COLUMN "signature" SET DEFAULT 'Sunshine';

ALTER TABLE "Reply" ALTER COLUMN "signature" SET NOT NULL;
ALTER TABLE "Reply" ALTER COLUMN "signature" SET DEFAULT 'Sunshine';

ALTER TABLE "User" ALTER COLUMN "signature" SET NOT NULL;
ALTER TABLE "User" ALTER COLUMN "signature" SET DEFAULT 'Sunshine';
