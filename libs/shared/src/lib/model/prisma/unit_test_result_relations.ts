import { TestClass } from './test_class';
import { PipelineResult } from './pipeline_result';
import { ApiProperty } from '@nestjs/swagger';

export class UnitTestResultRelations {
  @ApiProperty({ isArray: true, type: () => TestClass })
  testClasses: TestClass[];

  @ApiProperty({ type: () => PipelineResult })
  pipelineResult: PipelineResult;
}
