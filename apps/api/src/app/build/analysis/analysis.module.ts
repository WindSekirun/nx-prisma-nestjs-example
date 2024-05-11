import { Module } from '@nestjs/common';

import { BuildAnalysisService } from './analysis.service';
import { BuildAnalysisController } from './analysis.controller';

@Module({
  imports: [],
  controllers: [BuildAnalysisController],
  providers: [BuildAnalysisService],
})
export class BuildAnalysisModule {}
