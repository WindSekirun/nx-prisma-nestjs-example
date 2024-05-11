import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { getPipelineResult } from './utils/utils';

@Injectable()
export class BuildService {
  constructor(private readonly prisma: PrismaService) {}

  async getBuildList(cursor?: string, limitStr?: string) {
    if (limitStr && isNaN(Number(limitStr))) {
      throw new Error("Validation failed")
    }

    const limit = Number(limitStr) || 20

    const posts = await this.prisma.pipelineResult.findMany({
      take: limit + 1,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: {
        buildId: 'desc',
      },
    });

    let nextCursor: string | null = null;

    if (posts.length > limit) {
      const nextItem = posts.pop();
      nextCursor = nextItem.id.toString();
    }

    return {
      data: posts,
      nextCursor,
    };
  }

  async getBuild(buildId: string) {
    return await this.getPipelineResult(buildId);
  }
  
  private async getPipelineResult(buildId: string) {
    return await getPipelineResult(this.prisma, buildId);
  }
}
