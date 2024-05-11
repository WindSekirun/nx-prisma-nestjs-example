import { PipelineResult } from './pipeline_result';
import { ApiProperty } from '@nestjs/swagger';

export class BuildLogRelations {
  @ApiProperty({ type: () => PipelineResult })
  pipelineResult: PipelineResult;
}
