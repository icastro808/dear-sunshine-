-- DropForeignKey
ALTER TABLE "Reply" DROP CONSTRAINT "Reply_letterId_fkey";

-- AddForeignKey
ALTER TABLE "Reply" ADD CONSTRAINT "Reply_letterId_fkey" FOREIGN KEY ("letterId") REFERENCES "Letter"("id") ON DELETE CASCADE ON UPDATE CASCADE;
