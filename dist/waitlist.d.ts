import { z } from 'zod';
export declare const WaitlistKind: z.ZodEnum<{
    consumer: "consumer";
    brand: "brand";
}>;
export type WaitlistKind = z.infer<typeof WaitlistKind>;
/**
 * 소개 사이트의 베타 신청 · 브랜드 입점 문의.
 * 메시지는 사이트 폼에 그대로 보여주므로 한국어로 둔다.
 */
export declare const WaitlistRequest: z.ZodObject<{
    kind: z.ZodEnum<{
        consumer: "consumer";
        brand: "brand";
    }>;
    email: z.ZodPipe<z.ZodString, z.ZodEmail>;
    brandName: z.ZodOptional<z.ZodString>;
    consent: z.ZodLiteral<true>;
}, z.core.$strip>;
export type WaitlistRequest = z.infer<typeof WaitlistRequest>;
/** 이미 신청한 이메일인지 알려주지 않는다 — 남의 이메일로 가입 여부를 떠보는 걸 막기 위해서다. */
export declare const WaitlistResponse: z.ZodObject<{
    status: z.ZodLiteral<"received">;
}, z.core.$strip>;
export type WaitlistResponse = z.infer<typeof WaitlistResponse>;
/** 관리자 화면의 신청 목록 한 줄 */
export declare const WaitlistEntryView: z.ZodObject<{
    id: z.ZodUUID;
    kind: z.ZodEnum<{
        consumer: "consumer";
        brand: "brand";
    }>;
    email: z.ZodString;
    brandName: z.ZodNullable<z.ZodString>;
    createdAt: z.ZodISODateTime;
    invitedAt: z.ZodNullable<z.ZodISODateTime>;
}, z.core.$strip>;
export type WaitlistEntryView = z.infer<typeof WaitlistEntryView>;
export declare const WaitlistListQuery: z.ZodObject<{
    kind: z.ZodOptional<z.ZodEnum<{
        consumer: "consumer";
        brand: "brand";
    }>>;
    invited: z.ZodOptional<z.ZodEnum<{
        yes: "yes";
        no: "no";
    }>>;
}, z.core.$strip>;
export type WaitlistListQuery = z.infer<typeof WaitlistListQuery>;
//# sourceMappingURL=waitlist.d.ts.map