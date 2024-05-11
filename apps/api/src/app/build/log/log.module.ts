import { Module } from '@nestjs/common';

import { BuildLogController } from './log.controller';
import { BuildLogService } from './log.service';

@Module({
  imports: [],
  controllers: [BuildLogController],
  providers: [BuildLogService],
})
export class BuildLogModule {}
