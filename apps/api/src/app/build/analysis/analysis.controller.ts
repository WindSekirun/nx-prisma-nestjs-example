import { Body, Controller, Param, Post } from '@nestjs/common';
import { BuildAnalysisService } from './analysis.service';
import { ReqLogContent } from '@nx-prisma-nestjs-example/model/LogContent';

@Controller()
export class BuildAnalysisController {
  constructor(private readonly buildAnalysisService: BuildAnalysisService) {}

  @Post('build/:buildId/analysis/register')
  async registerResult(@Param('buildId') buildId: string) {
    return this.buildAnalysisService.registerBuild(buildId);
  }

  @Post('build/:buildId/analysis/log')
  async updateLog(
    @Param('buildId') buildId: string,
    @Body() logContent: ReqLogContent
  ) {
    return this.buildAnalysisService.updateBuildLog(buildId, logContent);
  }
}
