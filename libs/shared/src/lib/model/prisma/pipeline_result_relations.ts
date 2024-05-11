import { UnitTestResult } from './unit_test_result';
import { BuildLog } from './build_log';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PipelineResultRelations {
  @ApiProperty({ isArray: true, type: () => UnitTestResult })
  unitTestResults: UnitTestResult[];

  @ApiPropertyOptional({ type: () => BuildLog })
  BuildLog?: BuildLog;
}
