import { ApiProperty } from '@nestjs/swagger';

export class BuildLog {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: String })
  pipelineResultId: string;
}
