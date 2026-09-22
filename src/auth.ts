import { z } from 'zod';

export const MagicLinkRequest = z
  .object({
    email: z.string().trim().toLowerCase().pipe(z.email({ error: '이메일 형식이 올바르지 않습니다' }).max(254)),
  })
  .meta({ id: 'MagicLinkRequest' });
export type MagicLinkRequest = z.infer<typeof MagicLinkRequest>;

export const MagicLinkResponse = z
  .object({
    status: z.literal('sent'),
    /** 개발 환경에서만 — 메일 발송 없이 바로 로그인할 수 있게 링크를 돌려준다 */
    devToken: z.string().optional(),
  })
  .meta({ id: 'MagicLinkResponse' });
export type MagicLinkResponse = z.infer<typeof MagicLinkResponse>;

export const VerifyRequest = z.object({ token: z.string().min(20).max(200) }).meta({ id: 'VerifyRequest' });
export type VerifyRequest = z.infer<typeof VerifyRequest>;

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
export type MeView = z.infer<typeof MeView>;

/** 로그인 여부 확인 — 로그인하지 않았어도 200으로 { me: null }을 준다 (401을 콘솔 오류로 남기지 않게) */
export const SessionView = z.object({ me: MeView.nullable() }).meta({ id: 'SessionView' });
export type SessionView = z.infer<typeof SessionView>;
