import { z } from 'zod';
/** 「왜 안 샀는지」 — 검색은 무엇을 눌렀는지만 알지만, 대화는 거절 사유를 문장으로 남긴다 */
export const RejectionReason = z.enum(['price', 'color', 'fit_worry', 'material', 'style', 'other']).meta({ id: 'RejectionReason' });
export const RejectionReport = z
    .object({
    brandId: z.uuid(),
    totalSignals: z.number().int(),
    products: z.array(z.object({
        productId: z.uuid(),
        name: z.string(),
        signals: z.number().int(),
        reasons: z.array(z.object({ code: RejectionReason, count: z.number().int() })),
        samples: z.array(z.string()),
    })),
})
    .meta({ id: 'RejectionReport' });
//# sourceMappingURL=insights.js.map