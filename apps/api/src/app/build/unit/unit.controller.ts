import { Controller, Get, Param, Query } from '@nestjs/common';
import { BuildUnitTestService } from './unit.service';

@Controller()
export class BuildUnitTestController {
  constructor(private readonly buildUnitTestService: BuildUnitTestService) {}

  @Get('build/:buildId/unit')
  getUnitTestResults(@Param('buildId') buildId: string) {
    return this.buildUnitTestService.getUnitTestResults(buildId);
  }

  @Get('build/:buildId/unit/failed')
  async getFailedUnitTestList(
    @Param('buildId') buildId: string,
    @Query('moduleName') moduleName?: string,
    @Query('fetchAll') fetchAll?: string,
    @Query('cursor') cursor?: string,
    @Query('limit') limit?: string
  ) {
    return await this.buildUnitTestService.getFailedUnitTestList(
      buildId,
      moduleName,
      fetchAll,
      cursor,
      limit
    );
  }

  @Get('build/:buildId/unit/module/:moduleName')
  getUnitTestClasses(
    @Param('buildId') buildId: string,
    @Query('moduleName') moduleName: string
  ) {
    return this.buildUnitTestService.getUnitTestClasses(buildId, moduleName);
  }

  @Get('build/:buildId/unit/module/:moduleName/:classId')
  getUnitTestFunctions(
    @Param('buildId') buildId: string,
    @Query('moduleName') moduleName: string,
    @Param('classId') classId: string
  ) {
    return this.buildUnitTestService.getUnitTestFunctions(
      buildId,
      moduleName,
      classId
    );
  }
}
