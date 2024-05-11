import { UnitTestClass } from './unit_test_class';
import { UnitTestFailedTest } from './unit_test_failed_test';
import { ApiProperty } from '@nestjs/swagger';

export class UnitTestFunctionRelations {
  @ApiProperty({ type: () => UnitTestClass })
  unitTestClass: UnitTestClass;

  @ApiProperty({ isArray: true, type: () => UnitTestFailedTest })
  UnitTestFailedTest: UnitTestFailedTest[];
}
