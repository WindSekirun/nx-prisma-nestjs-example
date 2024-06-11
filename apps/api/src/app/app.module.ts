import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { BuildModule } from './build/build.module';
import { PrismaModule } from './prisma/prisma.module';
import { BullConfigModule } from './bull.config.module';

@Module({
  imports: [BuildModule, PrismaModule.forRoot(true), BullConfigModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
