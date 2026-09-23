import { z } from 'zod';
export declare const TopSize: z.ZodEnum<{
    XS: "XS";
    S: "S";
    M: "M";
    L: "L";
    XL: "XL";
    XXL: "XXL";
    "3XL": "3XL";
}>;
export declare const FitPreference: z.ZodEnum<{
    slim: "slim";
    regular: "regular";
    relaxed: "relaxed";
    oversized: "oversized";
}>;
/** 키·몸무게는 민감정보에 준해 다룬다 — 별도 동의 없이는 받지 않는다 */
export declare const BodyProfileInput: z.ZodObject<{
    heightCm: z.ZodNumber;
    weightKg: z.ZodNumber;
    usualTopSize: z.ZodEnum<{
        XS: "XS";
        S: "S";
        M: "M";
        L: "L";
        XL: "XL";
        XXL: "XXL";
        "3XL": "3XL";
    }>;
    fitPreference: z.ZodEnum<{
        slim: "slim";
        regular: "regular";
        relaxed: "relaxed";
        oversized: "oversized";
    }>;
    consent: z.ZodLiteral<true>;
}, z.core.$strip>;
export type BodyProfileInput = z.infer<typeof BodyProfileInput>;
export declare const BodyProfileView: z.ZodObject<{
    heightCm: z.ZodNumber;
    weightKg: z.ZodNumber;
    usualTopSize: z.ZodEnum<{
        XS: "XS";
        S: "S";
        M: "M";
        L: "L";
        XL: "XL";
        XXL: "XXL";
        "3XL": "3XL";
    }>;
    fitPreference: z.ZodEnum<{
        slim: "slim";
        regular: "regular";
        relaxed: "relaxed";
        oversized: "oversized";
    }>;
    consentedAt: z.ZodISODateTime;
}, z.core.$strip>;
export type BodyProfileView = z.infer<typeof BodyProfileView>;
//# sourceMappingURL=body-profile.d.ts.map