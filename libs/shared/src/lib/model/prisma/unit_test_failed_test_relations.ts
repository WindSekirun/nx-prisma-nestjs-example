import { UnitTestResult } from './unit_test_result';
import { ApiProperty } from '@nestjs/swagger';

export class UnitTestFailedTestRelations {
  @ApiProperty({ type: () => UnitTestResult })
  unitTestResult: UnitTestResult;
}
