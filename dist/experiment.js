import { z } from 'zod';
/**
 * 사용자 검증 실험 — 기획서 2단계 통과 기준.
 *  ① 원하는 상품 도달 시간이 검색·필터 대비 50% 이상 단축
 *  ③ 사용 의향(5점 척도 4점 이상) 60% 이상
 * 같은 과제를 두 조건(검색·필터 / 대화)으로 풀게 하고 시간을 잰다.
 */
export const ExperimentCondition = z.enum(['search', 'conversation']).meta({ id: 'ExperimentCondition' });
export const ExperimentTask = z
    .object({
    id: z.string(),
    prompt: z.string(),
    /** 성공 조건 — 담은 상품이 이 조건을 모두 만족해야 한다 */
    criteria: z.object({
        category: z.string().nullable(),
        priceMaxMinor: z.number().int().nullable(),
        colorFamilies: z.array(z.string()),
    }),
})
    .meta({ id: 'ExperimentTask' });
export const StartTrialRequest = z
    .object({
    participantCode: z.string().trim().min(1).max(40),
    taskId: z.string(),
    condition: ExperimentCondition,
})
    .meta({ id: 'StartTrialRequest' });
export const StartTrialResponse = z
    .object({ trialId: z.uuid(), task: ExperimentTask, startedAt: z.iso.datetime() })
    .meta({ id: 'StartTrialResponse' });
export const FinishTrialRequest = z
    .object({
    productId: z.uuid().nullable(),
    /** 과제를 포기했으면 null 상품으로 끝낸다 */
    intentScore: z.number().int().min(1).max(5),
})
    .meta({ id: 'FinishTrialRequest' });
export const FinishTrialResponse = z
    .object({ success: z.boolean(), elapsedMs: z.number().int() })
    .meta({ id: 'FinishTrialResponse' });
export const ExperimentSummary = z
    .object({
    trials: z.number().int(),
    byCondition: z.array(z.object({
        condition: ExperimentCondition,
        trials: z.number().int(),
        successRate: z.number().nullable(),
        medianMs: z.number().nullable(),
    })),
    /** 대화 조건의 중앙 도달 시간이 검색 대비 얼마나 줄었나 (0.5 이상이 통과) */
    timeReduction: z.number().nullable(),
    /** 사용 의향 4점 이상 비율 (0.6 이상이 통과) */
    intentRate: z.number().nullable(),
})
    .meta({ id: 'ExperimentSummary' });
//# sourceMappingURL=experiment.js.map