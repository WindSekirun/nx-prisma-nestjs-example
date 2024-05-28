import { Module } from '@nestjs/common';

import { BuildService } from './build.service';
import { BuildController } from './build.controller';
import { BuildLogModule } from './log/log.module';
import { BuildUnitTestModule } from './unit/unit.module';
import { BuildAnalysisModule } from './analysis/analysis.module';
import { MeiliService } from '../meili.service';

@Module({
  imports: [BuildLogModule, BuildAnalysisModule, BuildUnitTestModule],
  controllers: [BuildController],
  providers: [BuildService, MeiliService],
})
export class BuildModule {}
