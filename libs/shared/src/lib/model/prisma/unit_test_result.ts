import { ApiProperty } from '@nestjs/swagger';

export class UnitTestResult {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  moduleName: string;

  @ApiProperty({ isArray: true, type: String })
  failedTestIds: string[];

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: String })
  pipelineResultId: string;
}
