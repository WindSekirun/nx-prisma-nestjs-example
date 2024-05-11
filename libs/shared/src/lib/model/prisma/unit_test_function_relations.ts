import { UnitTestClass } from './unit_test_class';
import { ApiProperty } from '@nestjs/swagger';

export class UnitTestFunctionRelations {
  @ApiProperty({ type: () => UnitTestClass })
  unitTestClass: UnitTestClass;
}
