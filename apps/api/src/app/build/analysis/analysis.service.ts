import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ReqLogContent } from '@nx-prisma-nestjs-example/model/LogContent';
import { ReqUnitTestResult } from '@nx-prisma-nestjs-example/model/UnitTests';
import { TestStatus } from '@prisma/client';

@Injectable()
export class BuildAnalysisService {
  constructor(private readonly prisma: PrismaService) {}

  async registerBuild(buildId: string) {
    return await this.prisma.pipelineResult.create({
      data: {
        buildId: buildId,
      },
    });
  }

  async updateBuildLog(buildId: string, logContent: ReqLogContent) {
    const pipelineResult = await this.prisma.pipelineResult.findUnique({
      where: { buildId },
    });

    if (!pipelineResult) {
      throw new Error('PipelineResult not found');
    }

    const fullLog = logContent.log;
    const chunkSize = 128 * 1024;
    const chunkCount = Math.ceil(fullLog.length / chunkSize);
    const chunked: { i: number; log: string }[] = [];
    for (let i = 0; i < chunkCount; i++) {
      const start = i * chunkSize;
      const end = start + chunkSize;
      const chunkContent = fullLog.substring(
        start,
        Math.min(end, fullLog.length)
      );
      chunked.push({
        i: i,
        log: chunkContent,
      });
    }

    return await this.prisma.buildLog.create({
      data: {
        pipelineResultId: pipelineResult.id,
        logChunks: {
          create: chunked.map((chunk) => ({
            chunkIndex: chunk.i,
            logContent: chunk.log,
          })),
        },
      },
    });
  }

  async updateUnitTestResult(buildId: string, requests: ReqUnitTestResult[]) {
    const pipelineResult = await this.prisma.pipelineResult.findUnique({
      where: { buildId },
    });

    if (!pipelineResult) {
      throw new Error('PipelineResult not found');
    }

    return this.prisma.$transaction(async (prisma) => {
      for (const request of requests) {
        const createdUnitTestResult = await prisma.unitTestResult.create({
          data: {
            moduleName: request.moduleName,
            pipelineResultId: pipelineResult.id,
            unitTestClasses: {
              create: request.testClasses.map((testClass) => ({
                className: testClass.className,
                testFunctions: {
                  create: testClass.testFunctions.map((testFunction) => ({
                    functionName: testFunction.functionName,
                    status: testFunction.status as TestStatus,
                    testLogs: testFunction.testLogs,
                  })),
                },
              })),
            },
          },
          include: {
            unitTestClasses: {
              include: {
                testFunctions: true,
              },
            },
          },
        });

        for (const testClass of createdUnitTestResult.unitTestClasses) {
          for (const testFunction of testClass.testFunctions) {
            if (testFunction.status == TestStatus.FAILED) {
              await prisma.unitTestFailedTest.create({
                data: {
                  className: testClass.className,
                  functionName: testFunction.functionName,
                  classId: testClass.id,
                  functionId: testFunction.id,
                  unitTestResultId: createdUnitTestResult.id,
                },
              });
            }
          }
        }
      }
    });
  }
}
