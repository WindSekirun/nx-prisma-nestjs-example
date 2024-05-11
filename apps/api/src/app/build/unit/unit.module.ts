import { Module } from '@nestjs/common';

import { BuildUnitTestController } from './unit.controller';
import { BuildUnitTestService } from './unit.service';

@Module({
  imports: [],
  controllers: [BuildUnitTestController],
  providers: [BuildUnitTestService],
})
export class BuildUnitTestModule {}
