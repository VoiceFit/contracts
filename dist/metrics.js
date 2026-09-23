import { z } from 'zod';
/**
 * 검증 지표 — 기획서의 통과 기준과 분석 문서가 추가한 지표.
 * 비율은 0..1, 금액은 원. 분모가 0이면 null (「0%」와 「측정 안 됨」을 구분한다).
 */
export const MetricsSummary = z
    .object({
    from: z.iso.datetime(),
    to: z.iso.datetime(),
    sessions: z.number().int(),
    turns: z.number().int(),
    /** 세션당 음성·LLM 원가 (목표 60원 이하) */
    avgSessionCostWon: z.number().nullable(),
    /** 대화 후 24시간 안에 결제한 세션 비율 (목표 3% 이상) */
    sessionConversion: z.number().nullable(),
    /** 추천된 상품 중 담긴 비율 (목표 20% 이상) */
    recommendationAddRate: z.number().nullable(),
    /** 세션당 담긴 품목 수 — 코디 묶음이 CAC 회수를 좌우한다 (목표 1.6) */
    itemsPerSession: z.number().nullable(),
    /** 3턴 안에 상세·사이즈·담기까지 간 세션 비율 */
    reachWithin3Turns: z.number().nullable(),
    /** 3턴 미수렴으로 필터 화면에 폴백한 세션 비율 */
    fallbackRate: z.number().nullable(),
    topRejections: z.array(z.object({ code: z.string(), count: z.number().int() })),
    daily: z.array(z.object({ day: z.string(), sessions: z.number().int(), adds: z.number().int() })),
})
    .meta({ id: 'MetricsSummary' });
//# sourceMappingURL=metrics.js.map