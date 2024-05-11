import { ApiProperty } from '@nestjs/swagger';

export class UnitTestFailedTest {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  classId: string;

  @ApiProperty({ type: String })
  className: string;

  @ApiProperty({ type: String })
  functionId: string;

  @ApiProperty({ type: String })
  functionName: string;

  @ApiProperty({ type: String })
  unitTestResultId: string;
}
