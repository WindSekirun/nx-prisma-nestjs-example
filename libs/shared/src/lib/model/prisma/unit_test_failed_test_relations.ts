import { UnitTestClass } from './unit_test_class';
import { UnitTestFunction } from './unit_test_function';
import { UnitTestResult } from './unit_test_result';
import { ApiProperty } from '@nestjs/swagger';

export class UnitTestFailedTestRelations {
  @ApiProperty({ type: () => UnitTestClass })
  unitTestClass: UnitTestClass;

  @ApiProperty({ type: () => UnitTestFunction })
  unitTestFunction: UnitTestFunction;

  @ApiProperty({ type: () => UnitTestResult })
  unitTestResult: UnitTestResult;
}
