import { z } from 'zod';
/**
 * 검증 지표 — 기획서의 통과 기준과 분석 문서가 추가한 지표.
 * 비율은 0..1, 금액은 원. 분모가 0이면 null (「0%」와 「측정 안 됨」을 구분한다).
 */
export declare const MetricsSummary: z.ZodObject<{
    from: z.ZodISODateTime;
    to: z.ZodISODateTime;
    sessions: z.ZodNumber;
    turns: z.ZodNumber;
    avgSessionCostWon: z.ZodNullable<z.ZodNumber>;
    sessionConversion: z.ZodNullable<z.ZodNumber>;
    recommendationAddRate: z.ZodNullable<z.ZodNumber>;
    itemsPerSession: z.ZodNullable<z.ZodNumber>;
    reachWithin3Turns: z.ZodNullable<z.ZodNumber>;
    fallbackRate: z.ZodNullable<z.ZodNumber>;
    topRejections: z.ZodArray<z.ZodObject<{
        code: z.ZodString;
        count: z.ZodNumber;
    }, z.core.$strip>>;
    daily: z.ZodArray<z.ZodObject<{
        day: z.ZodString;
        sessions: z.ZodNumber;
        adds: z.ZodNumber;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type MetricsSummary = z.infer<typeof MetricsSummary>;
//# sourceMappingURL=metrics.d.ts.map