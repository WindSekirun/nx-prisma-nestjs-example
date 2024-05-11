import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LogContent } from '@nx-prisma-nestjs-example/model/LogContent';

@Injectable()
export class BuildService {
  constructor(private readonly prisma: PrismaService) {}

  async registerBuild(buildId: string) {
    return await this.prisma.pipelineResult.create({
      data: {
        buildId: buildId,
      },
    });
  }

  async updateBuildLog(buildId: string, logContent: LogContent) {
    const pipelineResult = await this.prisma.pipelineResult.findUnique({
      where: { buildId },
      include: {
        BuildLog: true,
      },
    });

    if (!pipelineResult) {
      throw new Error('PipelineResult not found');
    }

    return await this.prisma.buildLog.upsert({
      where: {
        pipelineResultId: pipelineResult.id,
      },
      update: {
        log: logContent.log,
      },
      create: {
        log: logContent.log,
        pipelineResultId: pipelineResult.id,
      },
    });
  }
}
