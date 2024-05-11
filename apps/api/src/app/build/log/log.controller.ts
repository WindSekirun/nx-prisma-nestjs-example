import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { BuildLogService } from './log.service';
import { ApiQuery } from '@nestjs/swagger';

@Controller()
export class BuildLogController {
  constructor(private readonly buildLogService: BuildLogService) {}

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
    return this.buildLogService.getBuildLogChunk(id, page || 1, orderBy);
  }
}
