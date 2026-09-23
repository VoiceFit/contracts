import { z } from 'zod';
/** 초기 집중 시장은 20~30대 남성 아우터·셋업. 이후 셔츠·니트로 넓힌다 (분석 문서 1-2). */
export declare const ProductCategory: z.ZodEnum<{
    outer_jacket: "outer_jacket";
    outer_coat: "outer_coat";
    outer_blouson: "outer_blouson";
    setup: "setup";
    shirt: "shirt";
    knit: "knit";
    pants: "pants";
}>;
export type ProductCategory = z.infer<typeof ProductCategory>;
export declare const ColorFamily: z.ZodEnum<{
    black: "black";
    white: "white";
    gray: "gray";
    navy: "navy";
    beige: "beige";
    brown: "brown";
    khaki: "khaki";
    blue: "blue";
    green: "green";
    etc: "etc";
}>;
export type ColorFamily = z.infer<typeof ColorFamily>;
export declare const FitType: z.ZodEnum<{
    slim: "slim";
    regular: "regular";
    relaxed: "relaxed";
    oversized: "oversized";
}>;
export type FitType = z.infer<typeof FitType>;
export declare const Occasion: z.ZodEnum<{
    date: "date";
    commute: "commute";
    casual: "casual";
    formal: "formal";
    outdoor: "outdoor";
}>;
export type Occasion = z.infer<typeof Occasion>;
/** 1~5 척도. 명도는 1 어두움 → 5 밝음, 보온은 1 얇음 → 5 두꺼움. */
export declare const Scale5: z.ZodNumber;
/**
 * 상품 속성 — 대화 조건이 매칭되는 대상.
 * 초기에는 수동 입력, 이후 배치(상품 이미지 + 후기)로 추출한다.
 */
export declare const ProductAttributes: z.ZodObject<{
    colorFamily: z.ZodEnum<{
        black: "black";
        white: "white";
        gray: "gray";
        navy: "navy";
        beige: "beige";
        brown: "brown";
        khaki: "khaki";
        blue: "blue";
        green: "green";
        etc: "etc";
    }>;
    lightness: z.ZodNumber;
    warmth: z.ZodNumber;
    fit: z.ZodEnum<{
        slim: "slim";
        regular: "regular";
        relaxed: "relaxed";
        oversized: "oversized";
    }>;
    occasions: z.ZodArray<z.ZodEnum<{
        date: "date";
        commute: "commute";
        casual: "casual";
        formal: "formal";
        outdoor: "outdoor";
    }>>;
    material: z.ZodString;
}, z.core.$strip>;
export type ProductAttributes = z.infer<typeof ProductAttributes>;
/** 실측 — 전부 단면 기준 mm로 정규화한다 (브랜드마다 둘레/단면이 섞여 있다). */
export declare const SizeMeasurement: z.ZodObject<{
    sizeLabel: z.ZodString;
    shoulderMm: z.ZodNullable<z.ZodNumber>;
    chestMm: z.ZodNumber;
    lengthMm: z.ZodNumber;
    sleeveMm: z.ZodNullable<z.ZodNumber>;
}, z.core.$strip>;
export type SizeMeasurement = z.infer<typeof SizeMeasurement>;
export declare const ProductCard: z.ZodObject<{
    productId: z.ZodUUID;
    brandName: z.ZodString;
    name: z.ZodString;
    category: z.ZodEnum<{
        outer_jacket: "outer_jacket";
        outer_coat: "outer_coat";
        outer_blouson: "outer_blouson";
        setup: "setup";
        shirt: "shirt";
        knit: "knit";
        pants: "pants";
    }>;
    priceMinor: z.ZodNumber;
    imageUrl: z.ZodNullable<z.ZodString>;
    colorFamily: z.ZodEnum<{
        black: "black";
        white: "white";
        gray: "gray";
        navy: "navy";
        beige: "beige";
        brown: "brown";
        khaki: "khaki";
        blue: "blue";
        green: "green";
        etc: "etc";
    }>;
}, z.core.$strip>;
export type ProductCard = z.infer<typeof ProductCard>;
export declare const VariantView: z.ZodObject<{
    variantId: z.ZodUUID;
    sizeLabel: z.ZodString;
    color: z.ZodString;
    available: z.ZodNumber;
}, z.core.$strip>;
export type VariantView = z.infer<typeof VariantView>;
export declare const ProductDetail: z.ZodObject<{
    productId: z.ZodUUID;
    brandName: z.ZodString;
    name: z.ZodString;
    category: z.ZodEnum<{
        outer_jacket: "outer_jacket";
        outer_coat: "outer_coat";
        outer_blouson: "outer_blouson";
        setup: "setup";
        shirt: "shirt";
        knit: "knit";
        pants: "pants";
    }>;
    priceMinor: z.ZodNumber;
    imageUrl: z.ZodNullable<z.ZodString>;
    colorFamily: z.ZodEnum<{
        black: "black";
        white: "white";
        gray: "gray";
        navy: "navy";
        beige: "beige";
        brown: "brown";
        khaki: "khaki";
        blue: "blue";
        green: "green";
        etc: "etc";
    }>;
    attributes: z.ZodObject<{
        colorFamily: z.ZodEnum<{
            black: "black";
            white: "white";
            gray: "gray";
            navy: "navy";
            beige: "beige";
            brown: "brown";
            khaki: "khaki";
            blue: "blue";
            green: "green";
            etc: "etc";
        }>;
        lightness: z.ZodNumber;
        warmth: z.ZodNumber;
        fit: z.ZodEnum<{
            slim: "slim";
            regular: "regular";
            relaxed: "relaxed";
            oversized: "oversized";
        }>;
        occasions: z.ZodArray<z.ZodEnum<{
            date: "date";
            commute: "commute";
            casual: "casual";
            formal: "formal";
            outdoor: "outdoor";
        }>>;
        material: z.ZodString;
    }, z.core.$strip>;
    measurements: z.ZodArray<z.ZodObject<{
        sizeLabel: z.ZodString;
        shoulderMm: z.ZodNullable<z.ZodNumber>;
        chestMm: z.ZodNumber;
        lengthMm: z.ZodNumber;
        sleeveMm: z.ZodNullable<z.ZodNumber>;
    }, z.core.$strip>>;
    variants: z.ZodArray<z.ZodObject<{
        variantId: z.ZodUUID;
        sizeLabel: z.ZodString;
        color: z.ZodString;
        available: z.ZodNumber;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type ProductDetail = z.infer<typeof ProductDetail>;
/** GET /v1/catalog/products 쿼리. 쿼리스트링은 문자열이라 숫자는 coerce한다. */
export declare const CatalogListQuery: z.ZodObject<{
    category: z.ZodOptional<z.ZodEnum<{
        outer_jacket: "outer_jacket";
        outer_coat: "outer_coat";
        outer_blouson: "outer_blouson";
        setup: "setup";
        shirt: "shirt";
        knit: "knit";
        pants: "pants";
    }>>;
    priceMaxMinor: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>;
export type CatalogListQuery = z.infer<typeof CatalogListQuery>;
//# sourceMappingURL=catalog.d.ts.map