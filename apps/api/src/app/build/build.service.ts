import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

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
}
