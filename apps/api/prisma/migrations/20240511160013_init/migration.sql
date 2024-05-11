/*
  Warnings:

  - You are about to drop the column `failedTestIds` on the `UnitTestResult` table. All the data in the column will be lost.
  - Added the required column `unitTestResultId` to the `UnitTestFailedTest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UnitTestFailedTest" ADD COLUMN     "unitTestResultId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UnitTestResult" DROP COLUMN "failedTestIds";

-- CreateIndex
CREATE INDEX "UnitTestFailedTest_classId_functionId_idx" ON "UnitTestFailedTest"("classId", "functionId");

-- AddForeignKey
ALTER TABLE "UnitTestFailedTest" ADD CONSTRAINT "UnitTestFailedTest_unitTestResultId_fkey" FOREIGN KEY ("unitTestResultId") REFERENCES "UnitTestResult"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
