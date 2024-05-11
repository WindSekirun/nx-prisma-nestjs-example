import { UnitTestFunction } from './unit_test_function';
import { UnitTestResult } from './unit_test_result';
import { UnitTestFailedTest } from './unit_test_failed_test';
import { ApiProperty } from '@nestjs/swagger';

export class UnitTestClassRelations {
  @ApiProperty({ isArray: true, type: () => UnitTestFunction })
  testFunctions: UnitTestFunction[];

  @ApiProperty({ type: () => UnitTestResult })
  unitTestResult: UnitTestResult;

  @ApiProperty({ isArray: true, type: () => UnitTestFailedTest })
  UnitTestFailedTest: UnitTestFailedTest[];
}
