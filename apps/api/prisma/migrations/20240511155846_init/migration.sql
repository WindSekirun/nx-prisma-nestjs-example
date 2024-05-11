/*
  Warnings:

  - You are about to drop the `TestClass` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TestFunction` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TestClass" DROP CONSTRAINT "TestClass_unitTestResultId_fkey";

-- DropForeignKey
ALTER TABLE "TestFunction" DROP CONSTRAINT "TestFunction_testClassId_fkey";

-- DropTable
DROP TABLE "TestClass";

-- DropTable
DROP TABLE "TestFunction";

-- CreateTable
CREATE TABLE "UnitTestFailedTest" (
    "id" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    "className" TEXT NOT NULL,
    "functionId" TEXT NOT NULL,
    "functionName" TEXT NOT NULL,

    CONSTRAINT "UnitTestFailedTest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UnitTestClass" (
    "id" TEXT NOT NULL,
    "className" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "unitTestResultId" TEXT NOT NULL,

    CONSTRAINT "UnitTestClass_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UnitTestFunction" (
    "id" TEXT NOT NULL,
    "functionName" TEXT NOT NULL,
    "status" "TestStatus" NOT NULL,
    "testLogs" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "unitTestClassId" TEXT NOT NULL,

    CONSTRAINT "UnitTestFunction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UnitTestClass_unitTestResultId_createdAt_updatedAt_idx" ON "UnitTestClass"("unitTestResultId", "createdAt" DESC, "updatedAt" DESC);

-- CreateIndex
CREATE INDEX "UnitTestFunction_status_createdAt_updatedAt_idx" ON "UnitTestFunction"("status", "createdAt" DESC, "updatedAt" DESC);

-- AddForeignKey
ALTER TABLE "UnitTestClass" ADD CONSTRAINT "UnitTestClass_unitTestResultId_fkey" FOREIGN KEY ("unitTestResultId") REFERENCES "UnitTestResult"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnitTestFunction" ADD CONSTRAINT "UnitTestFunction_unitTestClassId_fkey" FOREIGN KEY ("unitTestClassId") REFERENCES "UnitTestClass"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
