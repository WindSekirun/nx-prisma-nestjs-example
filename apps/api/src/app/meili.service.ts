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
    const aroundContext = 3;

    try {
      const index = this.client.index('build_log_chunks');
      const searchParams = {
        limit,
        offset: (page - 1) * limit,
        sort: ['createdAt:desc'],
        attributesToHighlight: ['logContent'],
        showMatchesPosition: true,
      };
      const result = await index.search(query, searchParams);

      const processedHits = result.hits.map((hit) => {
        const logContentLines = hit.logContent.split('\n');
        const formattedLogContentLines = hit._formatted?.logContent.split('\n');
        const positions = hit._matchesPosition?.logContent || [];

        const contextGroups = positions.reduce((groups, pos) => {
          let charCount = 0;
          logContentLines.forEach((line: string, index: number) => {
            const nextCharCount = charCount + line.length + 1;
            if (pos.start >= charCount && pos.start < nextCharCount) {
              const contextStart = Math.max(0, index - aroundContext);
              const contextEnd = Math.min(
                logContentLines.length - 1,
                index + aroundContext
              );

              const existingGroup = groups.find(
                (group) =>
                  (group.start >= contextStart && group.start <= contextEnd) ||
                  (group.end >= contextStart && group.end <= contextEnd)
              );

              if (existingGroup) {
                existingGroup.start = Math.min(
                  existingGroup.start,
                  contextStart
                );
                existingGroup.end = Math.max(existingGroup.end, contextEnd);
              } else {
                groups.push({ start: contextStart, end: contextEnd });
              }
            }
            charCount = nextCharCount;
          });
          return groups;
        }, [] as { start: number; end: number }[]);

        const context = contextGroups
          .sort((a, b) => a.start - b.start)
          .map((group) =>
            formattedLogContentLines
              ? formattedLogContentLines
                  .slice(group.start, group.end + 1)
                  .join('\n')
              : logContentLines.slice(group.start, group.end + 1).join('\n')
          )
          .join('\n...\n');

        return {
          id: hit.id,
          chunkIndex: hit.chunkIndex,
          buildId: hit.buildId,
          createdAt: hit.createdAt,
          logContent: context,
          matchesPosition: hit._matchesPosition,
        };
      });

      return {
        hits: processedHits,
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
