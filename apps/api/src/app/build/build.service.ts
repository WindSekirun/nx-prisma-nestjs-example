import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ReqLogContent } from '@nx-prisma-nestjs-example/model/LogContent';

@Injectable()
export class BuildService {
  constructor(private readonly prisma: PrismaService) {}

  async getBuildList(cursor?: string, limit?: number) {
    
  }

  async getBuild(buildId: string) {
    return await this.prisma.pipelineResult.findUnique({
      where: {
        buildId: buildId,
      },
    });
  }
}
