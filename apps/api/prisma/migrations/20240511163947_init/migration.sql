/*
  Warnings:

  - Added the required column `moduleName` to the `UnitTestFailedTest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UnitTestFailedTest" ADD COLUMN     "moduleName" TEXT NOT NULL;
