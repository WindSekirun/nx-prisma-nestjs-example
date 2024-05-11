import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { getPipelineResult } from '../utils/utils';

@Injectable()
export class BuildUnitTestService {
  constructor(private readonly prisma: PrismaService) {}

  async getFailedUnitTestList(
    buildId: string,
    moduleName?: string,
    fetchAllStr?: string,
    cursor?: string,
    limitStr?: string
  ) {
    if (limitStr && isNaN(Number(limitStr))) {
      throw new Error('Validation failed');
    }

    const limit = Number(limitStr) || 20;
    const fetchAll = fetchAllStr == 'true';

    const pipelineResult = await this.getPipelineResult(buildId);

    if (fetchAll) {
      return this.getFailedUnitTestListAll(pipelineResult.id, moduleName);
    } else {
      return this.getFailedUnitTestListByPagination(
        pipelineResult.id,
        moduleName,
        cursor,
        limit
      );
    }
  }

  async getUnitTestResults(buildId: string) {
    const pipelineResult = await this.getPipelineResult(buildId);

    return this.prisma.unitTestResult.findMany({
      where: { pipelineResultId: pipelineResult.id },
    });
  }

  async getUnitTestClasses(buildId: string, moduleName: string) {
    const pipelineResult = await this.getPipelineResult(buildId);
    const testResult = await this.prisma.unitTestResult.findFirst({
      where: {
        pipelineResultId: pipelineResult.id,
        moduleName: moduleName,
      },
    });

    if (!testResult) {
      return [];
    }

    return this.prisma.unitTestClass.findMany({
      where: {
        unitTestResultId: testResult.id
      },
      include: {
        testFunctions: false
      }
    });
  }

  async getUnitTestFunctions(
    buildId: string,
    moduleName: string,
    classId: string
  ) {
    const pipelineResult = await this.getPipelineResult(buildId);
    return this.prisma.unitTestClass.findFirst({
      where: {
        unitTestResult: { pipelineResultId: pipelineResult.id, moduleName },
        id: classId,
      },
      include: {
        testFunctions: {
          select: {
            id: true,
            functionName: true,
            status: true,
          },
        },
      },
    });
  }

  async getUnitTestFunctionDetails(
    buildId: string,
    moduleName: string,
    classId: string,
    functionId: string
  ) {
    const pipelineResult = await this.getPipelineResult(buildId);
    return this.prisma.unitTestFunction.findUnique({
      where: {
        id: functionId,
        unitTestClass: {
          id: classId,
          unitTestResult: { pipelineResultId: pipelineResult.id, moduleName },
        },
      },
    });
  }

  private async getFailedUnitTestListAll(
    pipelineResultId: string,
    moduleName?: string
  ) {
    const allFailedTests = await this.prisma.unitTestFailedTest.findMany({
      where: {
        unitTestResult: {
          pipelineResultId: pipelineResultId,
          ...(moduleName ? { moduleName: moduleName } : {}),
        },
      },
      orderBy: {
        unitTestResultId: 'desc',
      },
      include: {
        unitTestClass: true,
        unitTestFunction: true,
      },
    });
    return {
      data: allFailedTests,
    };
  }

  private async getFailedUnitTestListByPagination(
    pipelineResultId: string,
    moduleName?: string,
    cursor?: string,
    limit?: number
  ) {
    const failedTests = await this.prisma.unitTestFailedTest.findMany({
      where: {
        unitTestResult: {
          pipelineResultId: pipelineResultId,
          ...(moduleName ? { moduleName: moduleName } : {}),
        },
      },
      take: limit + 1,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: {
        unitTestResultId: 'asc',
      },
    });

    let nextCursor = null;
    if (failedTests.length > limit) {
      const nextItem = failedTests.pop();
      nextCursor = nextItem?.id;
    }

    return {
      data: failedTests,
      nextPageCursor: nextCursor,
    };
  }

  private async getPipelineResult(buildId: string) {
    return await getPipelineResult(this.prisma, buildId);
  }
}
