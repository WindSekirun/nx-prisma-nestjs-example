-- DropIndex
DROP INDEX "UnitTestFailedTest_classId_functionId_idx";

-- CreateIndex
CREATE INDEX "UnitTestFailedTest_classId_functionId_moduleName_idx" ON "UnitTestFailedTest"("classId", "functionId", "moduleName");
