import { Module } from '@nestjs/common';

import { BuildService } from './build.service';
import { BuildController } from './build.controller';
import { BuildLogModule } from './log/log.module';
import { BuildAnalysisService } from './analysis/analysis.service';
import { BuildUnitTestModule } from './unit/unit.module';

@Module({
  imports: [BuildLogModule, BuildAnalysisService, BuildUnitTestModule],
  controllers: [BuildController],
  providers: [BuildService],
})
export class BuildModule {}
