import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { LogIndexProcessor } from './processor/log.index.processor';
import { BullConfigModule } from './bull.config.module';

@Module({
  imports: [PrismaModule.forRoot(false), BullConfigModule],
  controllers: [],
  providers: [LogIndexProcessor],
})
export class WorkerAppModule {}
