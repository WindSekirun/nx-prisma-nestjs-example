import { PipelineResultRelations as _PipelineResultRelations } from './pipeline_result_relations';
import { BuildLogRelations as _BuildLogRelations } from './build_log_relations';
import { BuildLogChunkRelations as _BuildLogChunkRelations } from './build_log_chunk_relations';
import { UnitTestResultRelations as _UnitTestResultRelations } from './unit_test_result_relations';
import { UnitTestFailedTestRelations as _UnitTestFailedTestRelations } from './unit_test_failed_test_relations';
import { UnitTestClassRelations as _UnitTestClassRelations } from './unit_test_class_relations';
import { UnitTestFunctionRelations as _UnitTestFunctionRelations } from './unit_test_function_relations';
import { PipelineResult as _PipelineResult } from './pipeline_result';
import { BuildLog as _BuildLog } from './build_log';
import { BuildLogChunk as _BuildLogChunk } from './build_log_chunk';
import { UnitTestResult as _UnitTestResult } from './unit_test_result';
import { UnitTestFailedTest as _UnitTestFailedTest } from './unit_test_failed_test';
import { UnitTestClass as _UnitTestClass } from './unit_test_class';
import { UnitTestFunction as _UnitTestFunction } from './unit_test_function';

export namespace PrismaModel {
  export class PipelineResultRelations extends _PipelineResultRelations {}
  export class BuildLogRelations extends _BuildLogRelations {}
  export class BuildLogChunkRelations extends _BuildLogChunkRelations {}
  export class UnitTestResultRelations extends _UnitTestResultRelations {}
  export class UnitTestFailedTestRelations extends _UnitTestFailedTestRelations {}
  export class UnitTestClassRelations extends _UnitTestClassRelations {}
  export class UnitTestFunctionRelations extends _UnitTestFunctionRelations {}
  export class PipelineResult extends _PipelineResult {}
  export class BuildLog extends _BuildLog {}
  export class BuildLogChunk extends _BuildLogChunk {}
  export class UnitTestResult extends _UnitTestResult {}
  export class UnitTestFailedTest extends _UnitTestFailedTest {}
  export class UnitTestClass extends _UnitTestClass {}
  export class UnitTestFunction extends _UnitTestFunction {}

  export const extraModels = [
    PipelineResultRelations,
    BuildLogRelations,
    BuildLogChunkRelations,
    UnitTestResultRelations,
    UnitTestFailedTestRelations,
    UnitTestClassRelations,
    UnitTestFunctionRelations,
    PipelineResult,
    BuildLog,
    BuildLogChunk,
    UnitTestResult,
    UnitTestFailedTest,
    UnitTestClass,
    UnitTestFunction,
  ];
}
