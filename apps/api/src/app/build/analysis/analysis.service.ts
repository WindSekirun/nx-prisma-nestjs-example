import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ReqLogContent } from '@nx-prisma-nestjs-example/model/LogContent';

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
}
