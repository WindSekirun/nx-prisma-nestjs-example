import { Module } from '@nestjs/common';

import { BuildLogController } from './log.controller';
import { BuildLogService } from './log.service';
import { MeiliService } from '../../meili.service';
import { BullConfigModule } from '../../bull.config.module';

@Module({
  imports: [BullConfigModule],
  controllers: [BuildLogController],
  providers: [BuildLogService, MeiliService],
})
export class BuildLogModule {}
