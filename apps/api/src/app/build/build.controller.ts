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
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { PipelineResult } from '@nx-prisma-nestjs-example/model/prisma/pipeline_result';
import { ReqUnitTestResult } from '@nx-prisma-nestjs-example/model/UnitTests';

@Controller()
export class BuildController {
  constructor(private readonly buildService: BuildService) {}

  @ApiExtraModels(PipelineResult)
  @ApiResponse({
    status: 200,
    schema: {
      $ref: getSchemaPath(PipelineResult),
    },
  })
  @Get('build')
  async getBuildList(
    @Query('cursor') cursor?: string,
    @Query('limit', new ParseIntPipe()) limit?: number
  ) {
    return this.buildService.getBuildList(cursor, limit)
  }

  @ApiExtraModels(PipelineResult)
  @ApiResponse({
    status: 200,
    schema: {
      $ref: getSchemaPath(PipelineResult),
    },
  })
  @Get('build/:buildId')
  async getBuild(@Param('buildId') buildId: string) {
    return await this.buildService.getBuild(buildId);
  }

  @Post('build/:buildId/analysis/unit')
  async updateUnitTestResult(@Param('buildId') buildId: string, @Body() request: ReqUnitTestResult[]) {
    Logger.debug(buildId);
  }

  @Get('build/:buildId/failed/unit')
  async getFailedUnitTestList(@Param('buildId') buildId: string) {
    Logger.debug(buildId);
  }
}
