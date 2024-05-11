import { TestStatus } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TestFunction {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  functionName: string;

  @ApiProperty({ enum: TestStatus, enumName: 'TestStatus' })
  status: TestStatus;

  @ApiPropertyOptional({ type: String })
  testLogs?: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: String })
  testClassId: string;
}
