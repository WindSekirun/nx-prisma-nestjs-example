import { PipelineResultRelations as _PipelineResultRelations } from './pipeline_result_relations';
import { BuildLogRelations as _BuildLogRelations } from './build_log_relations';
import { UnitTestResultRelations as _UnitTestResultRelations } from './unit_test_result_relations';
import { TestClassRelations as _TestClassRelations } from './test_class_relations';
import { TestFunctionRelations as _TestFunctionRelations } from './test_function_relations';
import { PipelineResult as _PipelineResult } from './pipeline_result';
import { BuildLog as _BuildLog } from './build_log';
import { UnitTestResult as _UnitTestResult } from './unit_test_result';
import { TestClass as _TestClass } from './test_class';
import { TestFunction as _TestFunction } from './test_function';

export namespace PrismaModel {
  export class PipelineResultRelations extends _PipelineResultRelations {}
  export class BuildLogRelations extends _BuildLogRelations {}
  export class UnitTestResultRelations extends _UnitTestResultRelations {}
  export class TestClassRelations extends _TestClassRelations {}
  export class TestFunctionRelations extends _TestFunctionRelations {}
  export class PipelineResult extends _PipelineResult {}
  export class BuildLog extends _BuildLog {}
  export class UnitTestResult extends _UnitTestResult {}
  export class TestClass extends _TestClass {}
  export class TestFunction extends _TestFunction {}

  export const extraModels = [
    PipelineResultRelations,
    BuildLogRelations,
    UnitTestResultRelations,
    TestClassRelations,
    TestFunctionRelations,
    PipelineResult,
    BuildLog,
    UnitTestResult,
    TestClass,
    TestFunction,
  ];
}
