import { BuildLogChunk } from './build_log_chunk';
import { PipelineResult } from './pipeline_result';
import { ApiProperty } from '@nestjs/swagger';

export class BuildLogRelations {
  @ApiProperty({ isArray: true, type: () => BuildLogChunk })
  logChunks: BuildLogChunk[];

  @ApiProperty({ type: () => PipelineResult })
  pipelineResult: PipelineResult;
}
