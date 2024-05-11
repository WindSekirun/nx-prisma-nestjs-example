-- AddForeignKey
ALTER TABLE "UnitTestFailedTest" ADD CONSTRAINT "UnitTestFailedTest_classId_fkey" FOREIGN KEY ("classId") REFERENCES "UnitTestClass"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnitTestFailedTest" ADD CONSTRAINT "UnitTestFailedTest_functionId_fkey" FOREIGN KEY ("functionId") REFERENCES "UnitTestFunction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
