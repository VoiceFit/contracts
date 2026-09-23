import { z } from 'zod';
/**
 * 사용자 검증 실험 — 기획서 2단계 통과 기준.
 *  ① 원하는 상품 도달 시간이 검색·필터 대비 50% 이상 단축
 *  ③ 사용 의향(5점 척도 4점 이상) 60% 이상
 * 같은 과제를 두 조건(검색·필터 / 대화)으로 풀게 하고 시간을 잰다.
 */
export declare const ExperimentCondition: z.ZodEnum<{
    search: "search";
    conversation: "conversation";
}>;
export type ExperimentCondition = z.infer<typeof ExperimentCondition>;
export declare const ExperimentTask: z.ZodObject<{
    id: z.ZodString;
    prompt: z.ZodString;
    criteria: z.ZodObject<{
        category: z.ZodNullable<z.ZodString>;
        priceMaxMinor: z.ZodNullable<z.ZodNumber>;
        colorFamilies: z.ZodArray<z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>;
export type ExperimentTask = z.infer<typeof ExperimentTask>;
export declare const StartTrialRequest: z.ZodObject<{
    participantCode: z.ZodString;
    taskId: z.ZodString;
    condition: z.ZodEnum<{
        search: "search";
        conversation: "conversation";
    }>;
}, z.core.$strip>;
export type StartTrialRequest = z.infer<typeof StartTrialRequest>;
export declare const StartTrialResponse: z.ZodObject<{
    trialId: z.ZodUUID;
    task: z.ZodObject<{
        id: z.ZodString;
        prompt: z.ZodString;
        criteria: z.ZodObject<{
            category: z.ZodNullable<z.ZodString>;
            priceMaxMinor: z.ZodNullable<z.ZodNumber>;
            colorFamilies: z.ZodArray<z.ZodString>;
        }, z.core.$strip>;
    }, z.core.$strip>;
    startedAt: z.ZodISODateTime;
}, z.core.$strip>;
export type StartTrialResponse = z.infer<typeof StartTrialResponse>;
export declare const FinishTrialRequest: z.ZodObject<{
    productId: z.ZodNullable<z.ZodUUID>;
    intentScore: z.ZodNumber;
}, z.core.$strip>;
export type FinishTrialRequest = z.infer<typeof FinishTrialRequest>;
export declare const FinishTrialResponse: z.ZodObject<{
    success: z.ZodBoolean;
    elapsedMs: z.ZodNumber;
}, z.core.$strip>;
export type FinishTrialResponse = z.infer<typeof FinishTrialResponse>;
export declare const ExperimentSummary: z.ZodObject<{
    trials: z.ZodNumber;
    byCondition: z.ZodArray<z.ZodObject<{
        condition: z.ZodEnum<{
            search: "search";
            conversation: "conversation";
        }>;
        trials: z.ZodNumber;
        successRate: z.ZodNullable<z.ZodNumber>;
        medianMs: z.ZodNullable<z.ZodNumber>;
    }, z.core.$strip>>;
    timeReduction: z.ZodNullable<z.ZodNumber>;
    intentRate: z.ZodNullable<z.ZodNumber>;
}, z.core.$strip>;
export type ExperimentSummary = z.infer<typeof ExperimentSummary>;
//# sourceMappingURL=experiment.d.ts.map