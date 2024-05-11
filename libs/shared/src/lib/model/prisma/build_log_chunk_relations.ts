import { BuildLog } from './build_log';
import { ApiProperty } from '@nestjs/swagger';

export class BuildLogChunkRelations {
  @ApiProperty({ type: () => BuildLog })
  buildLog: BuildLog;
}
