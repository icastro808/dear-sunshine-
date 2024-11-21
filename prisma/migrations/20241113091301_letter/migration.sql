/*
  Warnings:

  - You are about to drop the `Stuff` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Stuff";

-- CreateTable
CREATE TABLE "Reply" (
    "id" SERIAL NOT NULL,
    "letterId" INTEGER NOT NULL,
    "reply" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Reply_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Letter" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "owner" TEXT NOT NULL,

    CONSTRAINT "Letter_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Reply" ADD CONSTRAINT "Reply_letterId_fkey" FOREIGN KEY ("letterId") REFERENCES "Letter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
