import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { getPipelineResult } from '../utils/utils';
import { MeiliService } from '../../meili.service';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class BuildLogService {
  constructor(
    private readonly prisma: PrismaService,
    private meili: MeiliService,
    @InjectQueue('log-index-queue') private readonly logIndexQueue: Queue
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

  async indexSingleBuildLog(buildId: string) {
    return this.meili.indexSingleBuildLog(buildId);
  }

  async indexBuildLogChunks() {
    let offset = 0;
    const limit = 1000;
    const batchSize = 100;

    while (true) {
      const chunks = await this.prisma.buildLogChunk.findMany({
        skip: offset,
        take: limit,
        select: {
          id: true,
        },
      });

      if (chunks.length == 0) {
        break;
      }

      for (let i = 0; i < chunks.length; i += batchSize) {
        const batch = chunks.slice(i, i + batchSize).map((chunk) => chunk.id);
        const existingDocIds = await this.meili.getExistingDocumentIds(
          batchSize,
          batch
        );
        const newDocs = batch.filter((id) => !existingDocIds.has(id));

        if (newDocs.length > 0) {
          await this.logIndexQueue.add('index-chunks', { ids: newDocs });
        } else {
          console.log(`Not need to index documents. offset: ${offset}`)
        }
      }

      offset += limit;
    }

    return Promise.resolve();
  }

  async search(query: string, page: number) {
    return await this.meili.searchBuildLogChunks(query, page);
  }
}
