import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { BuildService } from './build.service';
import {
  ApiExtraModels,
  ApiQuery,
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { PipelineResult } from '@nx-prisma-nestjs-example/model/prisma/pipeline_result';
import { LogContent } from '@nx-prisma-nestjs-example/model/LogContent';

@Controller()
export class BuildController {
  constructor(private readonly buildService: BuildService) {}

  @Post('build/:buildId/analysis/register')
  async registerResult(@Param('buildId') buildId: string) {
    return this.buildService.registerBuild(buildId);
  }

  @Post('build/:buildId/analysis/log')
  async updateLog(
    @Param('buildId') buildId: string,
    @Body() logContent: LogContent
  ) {
    return this.buildService.updateBuildLog(buildId, logContent);
  }

  @Post('build/:buildId/analysis/unit')
  async updateUnitTestResult(@Param('buildId') buildId: string) {
    Logger.debug(buildId);
  }

  @Get('build')
  async getBuildList() {}

  @ApiExtraModels(PipelineResult)
  @ApiResponse({
    status: 200,
    schema: {
      $ref: getSchemaPath(PipelineResult),
    },
  })
  @Get('build/:buildId')
  async getBuild(@Param('buildId') buildId: string) {
    Logger.debug(buildId);
  }

  @Get('build/:buildId/failed/unit')
  async getFailedUnitTestList(@Param('buildId') buildId: string) {
    Logger.debug(buildId);
  }

  @Get('build/:buildId/log')
  @ApiQuery({ name: 'page', required: false, type: 'number' })
  @ApiQuery({
    name: 'orderBy',
    required: false,
    type: 'string',
    description: '"asc" and "desc" are valid.',
  })
  async getLogChunk(
    @Param('buildId') id: string,
    @Query('page', new ParseIntPipe()) page?: number,
    @Query('orderBy') orderBy?: 'asc' | 'desc'
  ) {
    return this.buildService.getBuildLogChunk(id, page || 1, orderBy);
  }
}
