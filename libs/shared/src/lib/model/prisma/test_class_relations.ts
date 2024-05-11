import { TestFunction } from './test_function';
import { UnitTestResult } from './unit_test_result';
import { ApiProperty } from '@nestjs/swagger';

export class TestClassRelations {
  @ApiProperty({ isArray: true, type: () => TestFunction })
  testFunctions: TestFunction[];

  @ApiProperty({ type: () => UnitTestResult })
  unitTestResult: UnitTestResult;
}
