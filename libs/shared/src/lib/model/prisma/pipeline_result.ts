import { ApiProperty } from '@nestjs/swagger';

export class PipelineResult {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  buildId: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;
}
