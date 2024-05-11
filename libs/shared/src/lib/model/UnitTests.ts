export class ReqUnitTestResult {
  moduleName: string;
  testClasses: ReqUnitTestClass[];
}

export class ReqUnitTestClass {
  className: string;
  testFunctions: ReqUnitTestFunction[];
}

export class ReqUnitTestFunction {
  functionName: string;
  status: string;
  testLogs: string;
}
