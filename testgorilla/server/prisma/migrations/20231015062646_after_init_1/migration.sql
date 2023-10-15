/*
  Warnings:

  - You are about to drop the column `answers` on the `Assessment` table. All the data in the column will be lost.
  - You are about to drop the column `answers` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `correctAnswer` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `Test` table. All the data in the column will be lost.
  - You are about to drop the `Answer` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `answer` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_candidateId_fkey";

-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_questionId_fkey";

-- AlterTable
ALTER TABLE "Assessment" DROP COLUMN "answers";

-- AlterTable
ALTER TABLE "Candidate" ADD COLUMN     "answers" JSONB[];

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "answers",
DROP COLUMN "correctAnswer",
ADD COLUMN     "answer" TEXT NOT NULL,
ADD COLUMN     "options" TEXT[],
ADD COLUMN     "time" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Test" DROP COLUMN "time";

-- DropTable
DROP TABLE "Answer";
