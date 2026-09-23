# @voicefit/contracts

보이스핏의 **스키마 계약 원본**입니다. Zod 4로 한 번 쓰고, 여기서 두 갈래로 퍼집니다.

```
src/*.ts (Zod)  ──build──▶  dist/ (TypeScript 타입 + 런타임 검증)   → api · web · site
                └─export──▶  json-schema/contracts.schema.json      → agent (Pydantic 모델 생성)
```

계약이 한 곳에만 있어야 서버·웹·에이전트가 같은 형식을 믿을 수 있습니다. 소비자 저장소는
이 패키지를 **버전으로 고정해** 받고, 에이전트는 같은 버전의 JSON Schema에서 Python 모델을 생성합니다.

## 쓰는 쪽 설정

```bash
export NODE_AUTH_TOKEN=$(gh auth token)   # read:packages 권한 필요
pnpm add @voicefit/contracts
```

저장소 루트의 `.npmrc`가 `@voicefit` 스코프를 GitHub Packages로 보냅니다. 토큰은 파일에 적지 않고 환경 변수로만 넣습니다.

## 바꾸고 배포하기

```bash
pnpm test                 # 스키마 단위 테스트
pnpm export:json-schema   # dist + json-schema 재생성 (생성물도 커밋한다)
```

1. `src/*.ts` 수정 → `pnpm export:json-schema` → 테스트 → 커밋
2. `package.json`의 버전을 올리고 `v<버전>` 태그를 밀면 CI가 GitHub Packages에 배포합니다
   ```bash
   npm version minor && git push --follow-tags
   ```
3. 소비자 저장소(api·web·site)의 의존 버전을 올리고, agent는 `contracts-version.txt`를 올린 뒤 모델을 재생성합니다

**호환성:** 필드 추가는 minor, 필드 삭제·타입 변경은 major로 올립니다. 소비자가 같은 major 안에서 안전하게 따라올 수 있어야 합니다.
