# 기여 방법

혼자 개발하더라도 기록이 남아야 나중에 이유를 찾을 수 있다. 저장소 다섯 개가 같은 규칙을 쓴다.

## 커밋

- 메시지는 **한 줄**: `TYPE : 상세한 한국어 한 문장`. 콜론 양쪽에 공백을 둔다. 본문은 쓰지 않는다.
- TYPE 은 대문자: `FEAT` `FIX` `DOCS` `CHORE` `CI` `REFACTOR` `TEST`
- **기능별로 쪼갠다.** 설정·기능·문서를 한 커밋에 몰지 않는다.
- 작성자는 `RosieOh <20172207@gm.hannam.ac.kr>`. 커밋·PR 어디에도 AI 도구 표기를 넣지 않는다
  (GitHub 기여자 목록은 author 이메일과 `Co-authored-by` 로 집계된다).

예) `FEAT : 반품 부분 환불을 PG 부분 취소·원장 역분개·재입고로 한 번씩만 처리하는 반품 API 추가`

## 이슈 → 브랜치 → PR → 머지

1. **이슈**: 라벨은 TYPE 하나 + `area: *`, 마일스톤은 `Phase N · 이름`. 외부 조건(키·계약·녹음) 때문에
   막힌 일은 `blocked: external` 을 붙이고 **무엇이 있어야 풀리는지** 본문에 적는다.
2. **브랜치**: `<type>/<이슈번호>-slug` (예: `feat/12-toss-widget`)
3. **PR**: 제목은 커밋과 같은 `TYPE : 타이틀`. 본문에 `Closes #N` 과 함께 관련 이슈 / 변경 요약 /
   확인 방법 / 체크리스트를 한국어로 적는다.
4. **머지**: `gh pr view --json mergeable` 이 `MERGEABLE` 이 된 뒤에 머지한다 (바로 머지하면 조용히 실패해
   뒤 PR 순서가 꼬인 적이 있다). 머지 커밋 제목은 `TYPE : 타이틀 (#PR)`, 본문은 비우고 브랜치는 지운다.

```bash
gh pr merge --merge --subject "TYPE : 타이틀 (#PR)" --body "" --delete-branch
```

## 올리기 전에

```bash
pnpm typecheck && pnpm test && pnpm export:json-schema   # 생성물이 바뀌면 함께 커밋
```

비밀값이 섞이지 않았는지 본다 — `.env` 는 추적하지 않고, 토큰은 파일이 아니라 환경 변수·시크릿으로 넣는다.

## 배포

계약을 바꾸면 소비자(api·web·site·agent)가 따라와야 한다.

1. `package.json` 버전을 올린다 — 필드 추가는 minor, 삭제·타입 변경은 major
2. `v<버전>` 태그를 밀면 CI 가 GitHub Packages 에 배포한다
3. 소비자 저장소의 의존 버전(agent 는 `contracts-version.txt`)을 올리고 생성물을 다시 만든다
