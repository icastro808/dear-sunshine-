/*
  Warnings:

  - A unique constraint covering the columns `[userId,letterId,type]` on the table `Reaction` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Reaction_userId_letterId_type_key" ON "Reaction"("userId", "letterId", "type");
