import { Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { BuildService } from './build.service';

@Controller()
export class BuildController {
  constructor(private readonly buildService: BuildService) {}

  @Post('build/:buildId/analysis/register')
  async registerResult(@Param('buildId') buildId: string) {
    Logger.debug(buildId);
    return this.buildService.registerBuild(buildId);
  }

  @Post('build/:buildId/analysis/log')
  async updateLog(@Param('buildId') buildId: string) {
    Logger.debug(buildId);
  }

  @Post('build/:buildId/analysis/unit')
  async updateUnitTestResult(@Param('buildId') buildId: string) {
    Logger.debug(buildId);
  }

  @Get('build')
  async getBuildList() {
  }

  @Get('build/:buildId')
  async getBuild(@Param('buildId') buildId: string) {
    Logger.debug(buildId);
  }

  @Get('build/:buildId/failed/unit')
  async getFailedUnitTestList(@Param('buildId') buildId: string) {
    Logger.debug(buildId);
  }
}
