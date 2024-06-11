import { OnQueueActive, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MeiliService } from '../meili.service';

@Injectable()
@Processor('log-index-queue')
export class LogIndexProcessor {
  constructor(
    private readonly prisma: PrismaService,
    private readonly meili: MeiliService
  ) {}

  @OnQueueActive()
  onActive(job: Job) {
    console.log(
      `Processing job ${job.id} of type ${job.name} with data (${job.data.length} size)`
    );
  }

  @Process('index-chunk')
  async handleIndexChunk(job: Job) {
    const { ids } = job.data;
    const chunks = await this.prisma.buildLogChunk.findMany({
      where: { id: { in: ids } },
      include: {
        buildLog: {
          include: {
            pipelineResult: true,
          },
        },
      },
    });

    if (chunks) {
      this.meili.indexDocuments(
        chunks,
        (chunk) => chunk.buildLog.pipelineResult.buildId
      );
    }
  }
}
