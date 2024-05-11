# nx-prisma-nestjs-example

테스트의 결과를 DB로 저장하고, 이를 프론트에 제공하기 위한 예제들 모음

기본 스택:
* NX workspace
* Nest.js for Backend application
* Prisma for ORM
* Postgres for DB

가장 기본이 되는 데이터의 형태는 다음과 같음:
- 파이프라인 결과
  - 유닛 테스트 모듈 (1:n) / 1번 실행마다 45+
    - 유닛 테스트 클래스 (1:n) / 1번 실행마다 200+
      - 유닛 테스트 함수 (1:n) / 1번 실행마다 3000+
        - 테스트 상태

## 1. Prisma 기능 확장
* https://github.com/WindSekirun/nx-prisma-nestjs-example/commit/e5b892b868a1ef29ae35034b8e0cef8ccb43a051
* refer: https://github.com/prisma/prisma/issues/18628#issuecomment-1975271421

Prisma에서 기본으로 제공하지 않는 기능이나, 후술할 cuid2를 위해 Prisma의 기능을 확장시킬 수 있음.
또한, Global Module로 등록함으로서 개별 모듈에서 참조를 하지 않아도 됨

## 2. cuid2
* https://github.com/WindSekirun/nx-prisma-nestjs-example/commit/a229e4df4293eed6ea761f70bb4d58d37a0543d6#diff-0ea972252d10343108d3a06435b504515bda939ee9d3aea2a247b363ba7f6d8eR8

autoincrement int 대신 cuid를 사용할 수 있는데, 아래와 같은 포인트들이 있음
* 수평 확장성
* autoincrement 는 길이가 일정하지 않음
* UUID도 대안 중 한 개이지만 길고, '-'로 나눠져있어서 복사하기 불편함

다만 cuid는 보안성 문제로 인해 cuid2를 사용하는 것이 권장되는데, 아직까지 prisma 는 cuid2를 공식 지원하지 않음
* https://github.com/paralleldrive/cuid2
* https://github.com/prisma/prisma/issues/17102

따라서 https://www.npmjs.com/package/prisma-extension-cuid2 를 사용할 수 있고,
Prisma 기능 확장을 했다면 다음과 같이 사용 가능

```
import cuid2Extension from 'prisma-extension-cuid2';

base.$extends(
    cuid2Extension({
      // 정의하지 않은 경우 *:id 패턴을 사용하여 예상치 않은 버그를 일으킬 수 있으므로
      // 가능하면 cuid2를 사용할 모든 id를 정의하는 것이 좋음
      fields: [
        'PipelineResult:id',
        'UnitTestResult:id',
        'TestClass:id',
        'TestFunction:id',
        'BuildLog:id',
      ],
    })
  );
  ```

## 3. 데이터 구조에 따른 초기 Index
* https://github.com/WindSekirun/nx-prisma-nestjs-example/commit/a229e4df4293eed6ea761f70bb4d58d37a0543d6#diff-8868ba6f6bd7aa7823c3f1321cd671c494f85afdffb5df12ed2906d049a40adaR34

상술한 기본 데이터 구조에서, 파이프라인을 수행하는 Agent의 고유 ID가 Key로 되고,
(여기에서는 BUILD_ID라고 가정)
단순한 데이터의 리스트는 조회에 문제는 없지만, 대략적인 정보를 보여주어야 하는 경우에는 조회 성능에 영향을 미칠 수 있음.

그래서 적절한 Index를 미리 고려하는 것이 중요함.

단 인덱스를 생성하게 되면 읽기 속도는 빨라지는 반면, 쓰기 속도는 다소 느려짐.
하지만 현재 구성하려는 앱 + 데이터 구조상 쓰기는 아무리 빨라도 시간당 8~10번을 넘지 않기 때문에 자주 조회해야 하는 데이터에 인덱스를 설정하는 것이 이점이라고 할 수 있음.

Index 문법은 다음과 같음
* https://www.prisma.io/docs/orm/prisma-schema/data-model/indexes
```
@@index([필드, 필드(])
```

1. 생성 날짜, 업데이트 날짜 등에 인덱스를 추가하면, 일반적인 사용성상 과거 데이터보다는 현재 데이터를 더 중요하게 보므로 연산 성능에 긍정적인 영향을 미칠 수 있음
  * `@@index([createdAt(sort: Desc), updatedAt(sort: Desc)])`
2. 1:n의 1:n의 1:n으로 데이터 구조가 들어가기 때문에, 각 Relation에 해당하는 foreign key에 index를 걸어주는 것도 조인 성능에 긍정적인 영향을 미칠 수 있음.
  * `unitTestResult   UnitTestResult @relation(fields: [unitTestResultId], references: [id])`
  * `unitTestResultId String`
  * `@@index([unitTestResultId])`