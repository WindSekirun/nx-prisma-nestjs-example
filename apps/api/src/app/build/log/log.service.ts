import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { getPipelineResult } from '../utils/utils';
import { MeiliService } from '../../meili.service';

@Injectable()
export class BuildLogService {
  constructor(
    private readonly prisma: PrismaService,
    private meili: MeiliService
  ) {}

  async getBuildLogChunk(
    buildId: string,
    page: number = 1,
    orderBy?: 'asc' | 'desc'
  ) {
    const pipelineResult = await this.prisma.pipelineResult.findUnique({
      where: { buildId },
      include: {
        BuildLog: true,
      },
    });

    if (!pipelineResult || !pipelineResult.BuildLog) {
      throw new Error('PipelineResult or BuildLog not found');
    }

    const chunk = await this.prisma.buildLogChunk.findMany({
      where: {
        buildLogId: pipelineResult.BuildLog.id,
      },
      skip: page - 1,
      take: 1,
      orderBy: {
        chunkIndex: orderBy,
      },
    });

    return chunk[0];
  }

  async indexBuildLogChunks() {
    return await this.meili.indexBuildLogChunks();
  }

  async search(query: string, page: number) {
    return await this.meili.searchBuildLogChunks(query, page);
  }
}
