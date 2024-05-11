-- CreateEnum
CREATE TYPE "TestStatus" AS ENUM ('PASSED', 'FAILED');

-- CreateTable
CREATE TABLE "PipelineResult" (
    "id" TEXT NOT NULL,
    "buildId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PipelineResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BuildLog" (
    "id" TEXT NOT NULL,
    "log" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "pipelineResultId" TEXT NOT NULL,

    CONSTRAINT "BuildLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UnitTestResult" (
    "id" TEXT NOT NULL,
    "moduleName" TEXT NOT NULL,
    "failedTestIds" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "pipelineResultId" TEXT NOT NULL,

    CONSTRAINT "UnitTestResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestClass" (
    "id" TEXT NOT NULL,
    "className" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "unitTestResultId" TEXT NOT NULL,

    CONSTRAINT "TestClass_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestFunction" (
    "id" TEXT NOT NULL,
    "functionName" TEXT NOT NULL,
    "status" "TestStatus" NOT NULL,
    "testLogs" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "testClassId" TEXT NOT NULL,

    CONSTRAINT "TestFunction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PipelineResult_buildId_key" ON "PipelineResult"("buildId");

-- CreateIndex
CREATE INDEX "PipelineResult_buildId_createdAt_updatedAt_idx" ON "PipelineResult"("buildId", "createdAt" DESC, "updatedAt" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "BuildLog_pipelineResultId_key" ON "BuildLog"("pipelineResultId");

-- CreateIndex
CREATE INDEX "BuildLog_pipelineResultId_idx" ON "BuildLog"("pipelineResultId");

-- CreateIndex
CREATE INDEX "UnitTestResult_pipelineResultId_createdAt_idx" ON "UnitTestResult"("pipelineResultId", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "TestClass_unitTestResultId_createdAt_updatedAt_idx" ON "TestClass"("unitTestResultId", "createdAt" DESC, "updatedAt" DESC);

-- CreateIndex
CREATE INDEX "TestFunction_status_createdAt_updatedAt_idx" ON "TestFunction"("status", "createdAt" DESC, "updatedAt" DESC);

-- AddForeignKey
ALTER TABLE "BuildLog" ADD CONSTRAINT "BuildLog_pipelineResultId_fkey" FOREIGN KEY ("pipelineResultId") REFERENCES "PipelineResult"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnitTestResult" ADD CONSTRAINT "UnitTestResult_pipelineResultId_fkey" FOREIGN KEY ("pipelineResultId") REFERENCES "PipelineResult"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestClass" ADD CONSTRAINT "TestClass_unitTestResultId_fkey" FOREIGN KEY ("unitTestResultId") REFERENCES "UnitTestResult"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestFunction" ADD CONSTRAINT "TestFunction_testClassId_fkey" FOREIGN KEY ("testClassId") REFERENCES "TestClass"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
