import { z } from 'zod';

export const WaitlistKind = z.enum(['consumer', 'brand']).meta({ id: 'WaitlistKind' });
export type WaitlistKind = z.infer<typeof WaitlistKind>;

/**
 * 소개 사이트의 베타 신청 · 브랜드 입점 문의.
 * 메시지는 사이트 폼에 그대로 보여주므로 한국어로 둔다.
 */
export const WaitlistRequest = z
  .object({
    kind: WaitlistKind,
    // 붙여넣기로 딸려 온 공백·대문자는 정규화한 뒤 검증한다. 저장 형식은 DB CHECK(lower·btrim)와 같다.
    email: z
      .string()
      .trim()
      .toLowerCase()
      .pipe(z.email({ error: '이메일 형식이 올바르지 않습니다' }).max(254)),
    brandName: z.string().trim().min(1, { error: '브랜드명을 입력해 주세요' }).max(80).optional(),
    /** 개인정보 수집·이용 동의. 동의 없이는 받지 않는다 (개인정보보호법). */
    consent: z.literal(true, { error: '개인정보 수집·이용에 동의해 주세요' }),
  })
  .refine((v) => v.kind !== 'brand' || v.brandName !== undefined, {
    path: ['brandName'],
    error: '브랜드명을 입력해 주세요',
  })
  .meta({ id: 'WaitlistRequest' });
export type WaitlistRequest = z.infer<typeof WaitlistRequest>;

/** 이미 신청한 이메일인지 알려주지 않는다 — 남의 이메일로 가입 여부를 떠보는 걸 막기 위해서다. */
export const WaitlistResponse = z.object({ status: z.literal('received') }).meta({ id: 'WaitlistResponse' });
export type WaitlistResponse = z.infer<typeof WaitlistResponse>;

/** 관리자 화면의 신청 목록 한 줄 */
export const WaitlistEntryView = z
  .object({
    id: z.uuid(),
    kind: WaitlistKind,
    email: z.string(),
    brandName: z.string().nullable(),
    createdAt: z.iso.datetime(),
    invitedAt: z.iso.datetime().nullable(),
  })
  .meta({ id: 'WaitlistEntryView' });
export type WaitlistEntryView = z.infer<typeof WaitlistEntryView>;

export const WaitlistListQuery = z
  .object({
    kind: WaitlistKind.optional(),
    invited: z.enum(['yes', 'no']).optional(),
  })
  .meta({ id: 'WaitlistListQuery' });
export type WaitlistListQuery = z.infer<typeof WaitlistListQuery>;
