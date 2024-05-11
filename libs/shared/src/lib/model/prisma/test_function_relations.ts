import { TestClass } from './test_class';
import { ApiProperty } from '@nestjs/swagger';

export class TestFunctionRelations {
  @ApiProperty({ type: () => TestClass })
  testClass: TestClass;
}
