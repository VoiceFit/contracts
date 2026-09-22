// Zod 원본 → json-schema/contracts.schema.json
// Python 티어는 이 파일에서 Pydantic 모델을 생성한다 (apps/agent/scripts/gen_contracts.py).
// 생성물은 커밋한다 — CI가 재생성 후 diff로 손수정·누락을 잡는다.
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { z } from 'zod';
import * as c from '../dist/index.js';

// Python에서 쓸 최상위 타입만 나열한다. 나머지는 $defs로 따라 들어간다.
const bundle = z
  .object({
    uiPatch: c.UiPatch,
    queryDiff: c.QueryDiff,
    queryState: c.QueryState,
    productDetail: c.ProductDetail,
    cartView: c.CartView,
    orderView: c.OrderView,
    clientMessage: c.ClientMessage,
    metricsSummary: c.MetricsSummary,
    rejectionReport: c.RejectionReport,
    experimentTask: c.ExperimentTask,
    startTrialRequest: c.StartTrialRequest,
    startTrialResponse: c.StartTrialResponse,
    finishTrialRequest: c.FinishTrialRequest,
    finishTrialResponse: c.FinishTrialResponse,
    experimentSummary: c.ExperimentSummary,
  })
  .meta({ title: 'VoicefitContracts' });

const schema = z.toJSONSchema(bundle, {
  target: 'draft-2020-12',
  // .default()가 붙은 필드도 출력(파싱 후) 기준으로 필수로 본다 — Python은 수신 측이다
  io: 'output',
  // z.uuid()·z.iso.datetime()은 format과 정규식 pattern을 함께 낸다. Python 생성기는 format만으로
  // UUID·AwareDatetime 타입을 만든다. pattern이 남으면 uuid는 필드마다 RootModel 래퍼가 생기고,
  // datetime은 파싱된 datetime에 문자열 정규식을 걸어 검증이 항상 실패한다. 검증은 양쪽 파서가 한다.
  override: (ctx) => {
    const s = ctx.jsonSchema;
    if (s.format === 'uuid' || s.format === 'date-time') delete s.pattern;
    collapseNullablePrimitive(s);
  },
});

/**
 * anyOf: [{type: 'integer', minimum: 1}, {type: 'null'}] → {type: ['integer', 'null'], minimum: 1}
 * 같은 의미지만, anyOf 형태로 두면 Python 생성기가 제약 있는 쪽을 RootModel로 뽑아
 * `state.lightness.root`처럼 꺼내야 한다. 원시 타입에만 적용한다 (객체·배열·$ref는 그대로).
 */
function collapseNullablePrimitive(s) {
  if (!Array.isArray(s.anyOf) || s.anyOf.length !== 2) return;
  const nullable = s.anyOf.some((m) => m.type === 'null');
  const other = s.anyOf.find((m) => m.type !== 'null');
  if (!nullable || !other || other.$ref || typeof other.type !== 'string') return;
  if (other.type === 'object' || other.type === 'array') return;
  delete s.anyOf;
  Object.assign(s, other, { type: [other.type, 'null'] });
}

const out = join(dirname(fileURLToPath(import.meta.url)), '..', 'json-schema', 'contracts.schema.json');
writeFileSync(out, JSON.stringify(schema, null, 2) + '\n');
console.log(`wrote ${out} ($defs: ${Object.keys(schema.$defs ?? {}).length})`);
