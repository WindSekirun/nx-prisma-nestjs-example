import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import MeiliSearch from 'meilisearch';

@Injectable()
export class MeiliService implements OnModuleInit {
  private client: MeiliSearch;

  constructor(private prisma: PrismaService) {
    this.client = new MeiliSearch({
      host: 'http://127.0.0.1:7700',
      apiKey: 'sampleMasterKeyOfSomething',
    });
  }

  async onModuleInit() {
    const index = this.client.index('build_log_chunks');
    await index.updateSortableAttributes(['createdAt']);
  }

  async indexBuildLogChunks() {
    const chunks = await this.prisma.buildLogChunk.findMany({
      include: {
        buildLog: {
          include: {
            pipelineResult: true,
          },
        },
      },
    });

    const documents = chunks.map((chunk) => ({
      id: chunk.id,
      chunkIndex: chunk.chunkIndex,
      logContent: chunk.logContent,
      buildId: chunk.buildLog.pipelineResult.buildId,
      createdAt: chunk.createdAt.toISOString(),
    }));

    try {
      const index = this.client.index('build_log_chunks');
      await index.addDocuments(documents, { primaryKey: 'id' });
    } catch (error) {
      console.log(error);
    }
  }

  async searchBuildLogChunks(query: string, page: number) {
    const limit = 10;
    try {
      const index = this.client.index('build_log_chunks');
      const searchParams = {
        limit: limit,
        offset: (page - 1) * limit,
        sort: ['createdAt:desc'],
        attributesToHighlight: ['logContent'],
        showMatchesPosition: true,
      };
      const result = await index.search(query, searchParams);
      console.log(result);

      return {
        hits: result.hits,
        totalHits: result.estimatedTotalHits,
        page,
        totalPages: Math.ceil(result.estimatedTotalHits / limit),
      };
    } catch (error) {
      throw error;
    }
  }

  async deleteBuildLogChunks(buildLogId: string) {
    try {
      const index = this.client.index('build_log_chunks');
      const chunks = await this.prisma.buildLogChunk.findMany({
        where: { buildLogId },
      });

      const idsToDelete = chunks.map((chunk) => chunk.id);
      await index.deleteDocuments(idsToDelete);
    } catch (error) {
      console.log(error);
    }
  }
}
