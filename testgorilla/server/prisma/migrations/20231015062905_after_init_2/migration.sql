/*
  Warnings:

  - You are about to drop the column `time` on the `Question` table. All the data in the column will be lost.
  - Added the required column `duration` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_testId_fkey";

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "time",
ADD COLUMN     "duration" INTEGER NOT NULL,
ALTER COLUMN "testId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test"("id") ON DELETE SET NULL ON UPDATE CASCADE;
