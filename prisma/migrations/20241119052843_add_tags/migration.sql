-- CreateEnum
CREATE TYPE "Tag" AS ENUM ('vent', 'advice', 'thoughts', 'positivity', 'love', 'family', 'friendship', 'school');

-- AlterTable
ALTER TABLE "Letter" ADD COLUMN     "tags" "Tag"[];

-- DropEnum
DROP TYPE "Condition";
