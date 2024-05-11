import { ApiProperty } from '@nestjs/swagger';

export class UnitTestClass {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  className: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: String })
  unitTestResultId: string;
}
