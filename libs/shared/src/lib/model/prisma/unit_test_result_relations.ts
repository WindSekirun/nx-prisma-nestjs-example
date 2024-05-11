import { UnitTestFailedTest } from './unit_test_failed_test';
import { UnitTestClass } from './unit_test_class';
import { PipelineResult } from './pipeline_result';
import { ApiProperty } from '@nestjs/swagger';

export class UnitTestResultRelations {
  @ApiProperty({ isArray: true, type: () => UnitTestFailedTest })
  unitTestFailedTests: UnitTestFailedTest[];

  @ApiProperty({ isArray: true, type: () => UnitTestClass })
  unitTestClasses: UnitTestClass[];

  @ApiProperty({ type: () => PipelineResult })
  pipelineResult: PipelineResult;
}
