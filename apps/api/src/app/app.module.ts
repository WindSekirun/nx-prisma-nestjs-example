import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { BuildModule } from './build/build.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [BuildModule, PrismaModule,],
  controllers: [],
  providers: [AppService,],
})
export class AppModule {}
