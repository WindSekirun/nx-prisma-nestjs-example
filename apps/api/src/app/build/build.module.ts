import { Module } from '@nestjs/common';

import { BuildService } from './build.service';
import { BuildController } from './build.controller';

@Module({
  imports: [],
  controllers: [BuildController],
  providers: [BuildService],
})
export class BuildModule {}
