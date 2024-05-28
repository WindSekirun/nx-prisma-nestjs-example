import { Module } from '@nestjs/common';

import { BuildLogController } from './log.controller';
import { BuildLogService } from './log.service';
import { MeiliService } from '../../meili.service';

@Module({
  imports: [],
  controllers: [BuildLogController],
  providers: [BuildLogService, MeiliService],
})
export class BuildLogModule {}
