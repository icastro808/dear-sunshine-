-- CreateEnum
CREATE TYPE "Tag" AS ENUM ('happy', 'neutral', 'sad', 'angry');

-- AlterTable
ALTER TABLE "Letter" ADD COLUMN     "tags" "Tag"[];

-- DropEnum
DROP TYPE "Condition";
