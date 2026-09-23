## 관련 이슈

Closes #

## 변경 요약

-

## 확인 방법

```bash
pnpm typecheck && pnpm test && pnpm export:json-schema
```

## 체크리스트

- [ ] 커밋은 `TYPE : 한 줄` (본문 없음) 이고 기능별로 쪼갰다
- [ ] 비밀값을 커밋하지 않았다 (`.env`·토큰은 환경 변수·시크릿으로)
- [ ] 계약(@voicefit/contracts)을 바꿨다면 버전을 올리고 소비자 저장소에 반영할 이슈를 남겼다
