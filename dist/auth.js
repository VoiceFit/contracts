import { z } from 'zod';
export const MagicLinkRequest = z
    .object({
    email: z.string().trim().toLowerCase().pipe(z.email({ error: '이메일 형식이 올바르지 않습니다' }).max(254)),
})
    .meta({ id: 'MagicLinkRequest' });
export const MagicLinkResponse = z
    .object({
    status: z.literal('sent'),
    /** 개발 환경에서만 — 메일 발송 없이 바로 로그인할 수 있게 링크를 돌려준다 */
    devToken: z.string().optional(),
})
    .meta({ id: 'MagicLinkResponse' });
export const VerifyRequest = z.object({ token: z.string().min(20).max(200) }).meta({ id: 'VerifyRequest' });
export const BrandRole = z.enum(['owner', 'staff']).meta({ id: 'BrandRole' });
export const MeView = z
    .object({
    customerId: z.uuid(),
    email: z.string(),
    isAdmin: z.boolean(),
    brands: z.array(z.object({ brandId: z.uuid(), name: z.string(), role: BrandRole })),
    hasBodyProfile: z.boolean(),
})
    .meta({ id: 'MeView' });
/** 로그인 여부 확인 — 로그인하지 않았어도 200으로 { me: null }을 준다 (401을 콘솔 오류로 남기지 않게) */
export const SessionView = z.object({ me: MeView.nullable() }).meta({ id: 'SessionView' });
/**
 * 앱(iOS·Android) 세션. 웹은 httpOnly 쿠키를 쓰지만 네이티브 클라이언트는 쿠키를 다루기 어렵다.
 * 그래서 같은 JWT 를 본문으로 돌려주고, 앱은 그걸 안전 저장소(Keychain·Keystore)에 넣어
 * `Authorization: Bearer` 로 보낸다. 웹 응답은 그대로 두어 토큰이 자바스크립트에 노출되지 않게 한다.
 */
export const NativeSessionView = z
    .object({
    token: z.string(),
    expiresAt: z.iso.datetime(),
    me: MeView,
})
    .meta({ id: 'NativeSessionView' });
//# sourceMappingURL=auth.js.map