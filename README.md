# @voicefit/contracts

보이스핏의 **스키마 계약 원본**입니다. Zod 4로 한 번 쓰고, 여기서 두 갈래로 퍼집니다.

```
src/*.ts (Zod)  ──build──▶  dist/ (TypeScript 타입 + 런타임 검증)   → api · web · site
                └─export──▶  json-schema/contracts.schema.json      → agent (Pydantic 모델 생성)
```

계약이 한 곳에만 있어야 서버·웹·에이전트가 같은 형식을 믿을 수 있습니다. 소비자 저장소는
이 패키지를 **버전으로 고정해** 받고, 에이전트는 같은 버전의 JSON Schema에서 Python 모델을 생성합니다.

## 쓰는 쪽 설정

이 저장소는 **공개**입니다. 계약(스키마)은 공개해도 되는 정보이고, 이걸 쓰는 서비스 저장소는 비공개입니다.

```bash
pnpm add @voicefit/contracts            # GitHub Packages (레지스트리). 토큰이 필요하다
pnpm add github:VoiceFit/contracts#v0.1.3   # 레지스트리 없이 태그에서 바로 (인증 불필요)
```

레지스트리로 받을 때는 저장소 루트의 `.npmrc`가 `@voicefit` 스코프를 GitHub Packages로 보냅니다.
pnpm 12는 `.npmrc`의 `${환경변수}`를 풀어 주지 않으므로 토큰은 사용자 설정에 넣습니다.

```bash
pnpm config set -g "//npm.pkg.github.com/:_authToken" "$(gh auth token)"
```

빌드 결과(`dist`)도 커밋합니다 — 태그에서 바로 설치할 때 설치 측에서 빌드하지 않게 하기 위해서입니다.
CI 가 다시 만들어 diff 로 어긋남을 잡습니다.

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
