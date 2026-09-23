import { z } from 'zod';
export const TopSize = z.enum(['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL']).meta({ id: 'TopSize' });
export const FitPreference = z.enum(['slim', 'regular', 'relaxed', 'oversized']).meta({ id: 'FitPreference' });
/** 키·몸무게는 민감정보에 준해 다룬다 — 별도 동의 없이는 받지 않는다 */
export const BodyProfileInput = z
    .object({
    heightCm: z.number().int().min(130, { error: '키를 확인해 주세요' }).max(220, { error: '키를 확인해 주세요' }),
    weightKg: z.number().int().min(30, { error: '몸무게를 확인해 주세요' }).max(180, { error: '몸무게를 확인해 주세요' }),
    usualTopSize: TopSize,
    fitPreference: FitPreference,
    consent: z.literal(true, { error: '체형 정보 수집·이용에 동의해 주세요' }),
})
    .meta({ id: 'BodyProfileInput' });
export const BodyProfileView = z
    .object({
    heightCm: z.number().int(),
    weightKg: z.number().int(),
    usualTopSize: TopSize,
    fitPreference: FitPreference,
    consentedAt: z.iso.datetime(),
})
    .meta({ id: 'BodyProfileView' });
//# sourceMappingURL=body-profile.js.map