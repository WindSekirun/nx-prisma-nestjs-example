import { PrismaClient } from '@prisma/client';
import { existsExtension } from './extensions/exists.extension';
import cuid2Extension from 'prisma-extension-cuid2';

function extendClient(base: PrismaClient) {
  // Add as many as you'd like - no ugly types required!
  return base.$extends(existsExtension).$extends(
    cuid2Extension({
      // 정의하지 않은 경우 *:id 패턴을 사용하여 예상치 않은 버그를 일으킬 수 있으므로
      // 가능하면 cuid2를 사용할 모든 id를 정의하는 것이 좋음
      fields: [
        'PipelineResult:id',
        'UnitTestResult:id',
        'UnitTestFailedTest:id',
        'UnitTestClass:id',
        'UnitTestFunction:id',
        'BuildLog:id',
        'BuildLogChunk:id'
      ],
    })
  );
}

class UntypedExtendedClient extends PrismaClient {
  constructor(options?: ConstructorParameters<typeof PrismaClient>[0]) {
    super(options);

    return extendClient(this) as this;
  }
}

const ExtendedPrismaClient = UntypedExtendedClient as unknown as new (
  options?: ConstructorParameters<typeof PrismaClient>[0]
) => ReturnType<typeof extendClient>;

export { ExtendedPrismaClient };
