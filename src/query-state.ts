import { z } from 'zod';
import { ColorFamily, FitType, Occasion, ProductCategory, Scale5 } from './catalog.js';
import { MinorAmount } from './money.js';

/**
 * 대화가 지금까지 좁혀 온 검색 조건.
 *
 * 다중 턴을 채팅 히스토리로 다루지 않고 이 객체에 대한 diff(QueryOp)로 다룬다.
 * 그래서 결정론적이고, 리플레이할 수 있고, 3턴 미수렴 시 같은 객체로 필터 UI에 폴백할 수 있다.
 * (docs/architecture/04-query-state-machine.mmd)
 */
export const QueryState = z
  .object({
    category: ProductCategory.nullable(),
    priceMinMinor: MinorAmount.nullable(),
    priceMaxMinor: MinorAmount.nullable(),
    /** 허용 색 계열. 비어 있으면 제한 없음. */
    colorFamilies: z.array(ColorFamily),
    /** 목표 명도 (1 어두움 → 5 밝음). 「더 밝은 색」은 +1 */
    lightness: Scale5.nullable(),
    /** 목표 보온 (1 얇음 → 5 두꺼움). 「너무 두껍지 않게」는 상한으로 쓴다 */
    warmth: Scale5.nullable(),
    fit: FitType.nullable(),
    occasion: Occasion.nullable(),
    excludeProductIds: z.array(z.uuid()),
    /** 「이거랑 입을 바지」 — 코디 기준 상품 */
    pairWithProductId: z.uuid().nullable(),
  })
  .meta({ id: 'QueryState' });
export type QueryState = z.infer<typeof QueryState>;

export const EMPTY_QUERY_STATE: QueryState = {
  category: null,
  priceMinMinor: null,
  priceMaxMinor: null,
  colorFamilies: [],
  lightness: null,
  warmth: null,
  fit: null,
  occasion: null,
  excludeProductIds: [],
  pairWithProductId: null,
};

export const ClearableField = z
  .enum(['category', 'price', 'colorFamilies', 'lightness', 'warmth', 'fit', 'occasion', 'pairWith'])
  .meta({ id: 'ClearableField' });
export type ClearableField = z.infer<typeof ClearableField>;

/**
 * 조건 변경 연산. 필드마다 연산을 따로 둔다.
 * 제네릭 set(field, value)보다 LLM 추출이 정확하고, strict 툴 스키마로 값 타입까지 강제된다.
 */
export const QueryOp = z
  .discriminatedUnion('op', [
    z.object({ op: z.literal('set_category'), value: ProductCategory }).meta({ title: 'SetCategoryOp' }),
    z.object({ op: z.literal('set_price_max'), valueMinor: MinorAmount }).meta({ title: 'SetPriceMaxOp' }),
    z.object({ op: z.literal('set_price_min'), valueMinor: MinorAmount }).meta({ title: 'SetPriceMinOp' }),
    /** 「이거보다 싼 거」 — 지금 보고 있는 상품 가격 기준. 리듀서가 컨텍스트로 해석한다. */
    z.object({ op: z.literal('cheaper_than_focused') }).meta({ title: 'CheaperThanFocusedOp' }),
    z.object({ op: z.literal('set_colors'), values: z.array(ColorFamily).min(1) }).meta({ title: 'SetColorsOp' }),
    z.object({ op: z.literal('adjust_lightness'), delta: z.number().int().min(-2).max(2) }).meta({ title: 'AdjustLightnessOp' }),
    z.object({ op: z.literal('adjust_warmth'), delta: z.number().int().min(-2).max(2) }).meta({ title: 'AdjustWarmthOp' }),
    z.object({ op: z.literal('set_warmth'), value: Scale5 }).meta({ title: 'SetWarmthOp' }),
    z.object({ op: z.literal('set_fit'), value: FitType }).meta({ title: 'SetFitOp' }),
    z.object({ op: z.literal('set_occasion'), value: Occasion }).meta({ title: 'SetOccasionOp' }),
    z.object({ op: z.literal('exclude'), productIds: z.array(z.uuid()).min(1) }).meta({ title: 'ExcludeOp' }),
    z.object({ op: z.literal('pair_with'), productId: z.uuid(), category: ProductCategory }).meta({ title: 'PairWithOp' }),
    z.object({ op: z.literal('clear'), field: ClearableField }).meta({ title: 'ClearOp' }),
  ])
  .meta({ id: 'QueryOp' });
export type QueryOp = z.infer<typeof QueryOp>;

/** 조건 추출기(LLM)의 출력. 빈 배열 = 조건을 못 알아들음 (미수렴 턴으로 센다). */
export const QueryDiff = z
  .object({ ops: z.array(QueryOp).max(8) })
  .meta({ id: 'QueryDiff' });
export type QueryDiff = z.infer<typeof QueryDiff>;
