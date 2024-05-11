import type { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Injectable } from '@nestjs/common';

import { ExtendedPrismaClient } from './extended-client';
import { Prisma } from '@prisma/client';

@Injectable()
export class PrismaService
  extends ExtendedPrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    let logs: Prisma.LogLevel[] = [];
    if (process.env.NODE_ENV == 'production') {
      logs = ['error'];
    } else {
      logs = ['query', 'info', 'error'];
    }
    super({
      log: logs,
      errorFormat: 'colorless',
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
