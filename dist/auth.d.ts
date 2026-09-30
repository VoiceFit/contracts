import { z } from 'zod';
export declare const MagicLinkRequest: z.ZodObject<{
    email: z.ZodPipe<z.ZodString, z.ZodEmail>;
}, z.core.$strip>;
export type MagicLinkRequest = z.infer<typeof MagicLinkRequest>;
export declare const MagicLinkResponse: z.ZodObject<{
    status: z.ZodLiteral<"sent">;
    devToken: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type MagicLinkResponse = z.infer<typeof MagicLinkResponse>;
export declare const VerifyRequest: z.ZodObject<{
    token: z.ZodString;
}, z.core.$strip>;
export type VerifyRequest = z.infer<typeof VerifyRequest>;
export declare const BrandRole: z.ZodEnum<{
    owner: "owner";
    staff: "staff";
}>;
export declare const MeView: z.ZodObject<{
    customerId: z.ZodUUID;
    email: z.ZodString;
    isAdmin: z.ZodBoolean;
    brands: z.ZodArray<z.ZodObject<{
        brandId: z.ZodUUID;
        name: z.ZodString;
        role: z.ZodEnum<{
            owner: "owner";
            staff: "staff";
        }>;
    }, z.core.$strip>>;
    hasBodyProfile: z.ZodBoolean;
}, z.core.$strip>;
export type MeView = z.infer<typeof MeView>;
/** 로그인 여부 확인 — 로그인하지 않았어도 200으로 { me: null }을 준다 (401을 콘솔 오류로 남기지 않게) */
export declare const SessionView: z.ZodObject<{
    me: z.ZodNullable<z.ZodObject<{
        customerId: z.ZodUUID;
        email: z.ZodString;
        isAdmin: z.ZodBoolean;
        brands: z.ZodArray<z.ZodObject<{
            brandId: z.ZodUUID;
            name: z.ZodString;
            role: z.ZodEnum<{
                owner: "owner";
                staff: "staff";
            }>;
        }, z.core.$strip>>;
        hasBodyProfile: z.ZodBoolean;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type SessionView = z.infer<typeof SessionView>;
/**
 * 앱(iOS·Android) 세션. 웹은 httpOnly 쿠키를 쓰지만 네이티브 클라이언트는 쿠키를 다루기 어렵다.
 * 그래서 같은 JWT 를 본문으로 돌려주고, 앱은 그걸 안전 저장소(Keychain·Keystore)에 넣어
 * `Authorization: Bearer` 로 보낸다. 웹 응답은 그대로 두어 토큰이 자바스크립트에 노출되지 않게 한다.
 */
export declare const NativeSessionView: z.ZodObject<{
    token: z.ZodString;
    expiresAt: z.ZodISODateTime;
    me: z.ZodObject<{
        customerId: z.ZodUUID;
        email: z.ZodString;
        isAdmin: z.ZodBoolean;
        brands: z.ZodArray<z.ZodObject<{
            brandId: z.ZodUUID;
            name: z.ZodString;
            role: z.ZodEnum<{
                owner: "owner";
                staff: "staff";
            }>;
        }, z.core.$strip>>;
        hasBodyProfile: z.ZodBoolean;
    }, z.core.$strip>;
}, z.core.$strip>;
export type NativeSessionView = z.infer<typeof NativeSessionView>;
//# sourceMappingURL=auth.d.ts.map