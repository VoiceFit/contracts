import { z } from 'zod';
/** 「왜 안 샀는지」 — 검색은 무엇을 눌렀는지만 알지만, 대화는 거절 사유를 문장으로 남긴다 */
export declare const RejectionReason: z.ZodEnum<{
    color: "color";
    material: "material";
    price: "price";
    other: "other";
    fit_worry: "fit_worry";
    style: "style";
}>;
export type RejectionReason = z.infer<typeof RejectionReason>;
export declare const RejectionReport: z.ZodObject<{
    brandId: z.ZodUUID;
    totalSignals: z.ZodNumber;
    products: z.ZodArray<z.ZodObject<{
        productId: z.ZodUUID;
        name: z.ZodString;
        signals: z.ZodNumber;
        reasons: z.ZodArray<z.ZodObject<{
            code: z.ZodEnum<{
                color: "color";
                material: "material";
                price: "price";
                other: "other";
                fit_worry: "fit_worry";
                style: "style";
            }>;
            count: z.ZodNumber;
        }, z.core.$strip>>;
        samples: z.ZodArray<z.ZodString>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type RejectionReport = z.infer<typeof RejectionReport>;
//# sourceMappingURL=insights.d.ts.map