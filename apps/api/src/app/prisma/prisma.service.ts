import type { OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { Injectable } from "@nestjs/common";

import { ExtendedPrismaClient } from "./extended-client";

@Injectable()
export class PrismaService extends ExtendedPrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({
      log: ['query', 'info'],
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