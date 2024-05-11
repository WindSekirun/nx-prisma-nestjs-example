import { Controller, Get, Param, Query } from '@nestjs/common';
import { BuildService } from './build.service';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { PipelineResult } from '@nx-prisma-nestjs-example/model/prisma/pipeline_result';

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
    @Query('limit') limit?: string
  ) {
    return this.buildService.getBuildList(cursor, limit);
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
}
