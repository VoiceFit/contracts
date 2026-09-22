import { z } from 'zod';
import { MinorAmount } from './money.js';

/** 초기 집중 시장은 20~30대 남성 아우터·셋업. 이후 셔츠·니트로 넓힌다 (분석 문서 1-2). */
export const ProductCategory = z
  .enum(['outer_jacket', 'outer_coat', 'outer_blouson', 'setup', 'shirt', 'knit', 'pants'])
  .meta({ id: 'ProductCategory' });
export type ProductCategory = z.infer<typeof ProductCategory>;

export const ColorFamily = z
  .enum(['black', 'white', 'gray', 'navy', 'beige', 'brown', 'khaki', 'blue', 'green', 'etc'])
  .meta({ id: 'ColorFamily' });
export type ColorFamily = z.infer<typeof ColorFamily>;

export const FitType = z.enum(['slim', 'regular', 'relaxed', 'oversized']).meta({ id: 'FitType' });
export type FitType = z.infer<typeof FitType>;

export const Occasion = z
  .enum(['commute', 'casual', 'date', 'formal', 'outdoor'])
  .meta({ id: 'Occasion' });
export type Occasion = z.infer<typeof Occasion>;

/** 1~5 척도. 명도는 1 어두움 → 5 밝음, 보온은 1 얇음 → 5 두꺼움. */
export const Scale5 = z.number().int().min(1).max(5);

/**
 * 상품 속성 — 대화 조건이 매칭되는 대상.
 * 초기에는 수동 입력, 이후 배치(상품 이미지 + 후기)로 추출한다.
 */
export const ProductAttributes = z
  .object({
    colorFamily: ColorFamily,
    lightness: Scale5,
    warmth: Scale5,
    fit: FitType,
    occasions: z.array(Occasion),
    material: z.string().max(60),
  })
  .meta({ id: 'ProductAttributes' });
export type ProductAttributes = z.infer<typeof ProductAttributes>;

/** 실측 — 전부 단면 기준 mm로 정규화한다 (브랜드마다 둘레/단면이 섞여 있다). */
export const SizeMeasurement = z
  .object({
    sizeLabel: z.string().min(1).max(16),
    shoulderMm: z.number().int().positive().nullable(),
    chestMm: z.number().int().positive(),
    lengthMm: z.number().int().positive(),
    sleeveMm: z.number().int().positive().nullable(),
  })
  .meta({ id: 'SizeMeasurement' });
export type SizeMeasurement = z.infer<typeof SizeMeasurement>;

export const ProductCard = z
  .object({
    productId: z.uuid(),
    brandName: z.string(),
    name: z.string(),
    category: ProductCategory,
    priceMinor: MinorAmount,
    imageUrl: z.string().nullable(),
    colorFamily: ColorFamily,
  })
  .meta({ id: 'ProductCard' });
export type ProductCard = z.infer<typeof ProductCard>;

export const VariantView = z
  .object({
    variantId: z.uuid(),
    sizeLabel: z.string(),
    color: z.string(),
    available: z.number().int().nonnegative(),
  })
  .meta({ id: 'VariantView' });
export type VariantView = z.infer<typeof VariantView>;

export const ProductDetail = ProductCard.extend({
  attributes: ProductAttributes,
  measurements: z.array(SizeMeasurement),
  variants: z.array(VariantView),
}).meta({ id: 'ProductDetail' });
export type ProductDetail = z.infer<typeof ProductDetail>;

/** GET /v1/catalog/products 쿼리. 쿼리스트링은 문자열이라 숫자는 coerce한다. */
export const CatalogListQuery = z
  .object({
    category: ProductCategory.optional(),
    priceMaxMinor: z.coerce.number().int().nonnegative().optional(),
    limit: z.coerce.number().int().min(1).max(50).default(24),
  })
  .meta({ id: 'CatalogListQuery' });
export type CatalogListQuery = z.infer<typeof CatalogListQuery>;
