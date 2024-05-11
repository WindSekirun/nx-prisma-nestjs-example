import { ApiProperty } from '@nestjs/swagger';

export class BuildLogChunk {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: Number })
  chunkIndex: number;

  @ApiProperty({ type: String })
  logContent: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: String })
  buildLogId: string;
}
