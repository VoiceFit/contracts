import { z } from 'zod';
/**
 * 대화가 지금까지 좁혀 온 검색 조건.
 *
 * 다중 턴을 채팅 히스토리로 다루지 않고 이 객체에 대한 diff(QueryOp)로 다룬다.
 * 그래서 결정론적이고, 리플레이할 수 있고, 3턴 미수렴 시 같은 객체로 필터 UI에 폴백할 수 있다.
 * (docs/architecture/04-query-state-machine.mmd)
 */
export declare const QueryState: z.ZodObject<{
    category: z.ZodNullable<z.ZodEnum<{
        outer_jacket: "outer_jacket";
        outer_coat: "outer_coat";
        outer_blouson: "outer_blouson";
        setup: "setup";
        shirt: "shirt";
        knit: "knit";
        pants: "pants";
    }>>;
    priceMinMinor: z.ZodNullable<z.ZodNumber>;
    priceMaxMinor: z.ZodNullable<z.ZodNumber>;
    colorFamilies: z.ZodArray<z.ZodEnum<{
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
    }>>;
    lightness: z.ZodNullable<z.ZodNumber>;
    warmth: z.ZodNullable<z.ZodNumber>;
    fit: z.ZodNullable<z.ZodEnum<{
        slim: "slim";
        regular: "regular";
        relaxed: "relaxed";
        oversized: "oversized";
    }>>;
    occasion: z.ZodNullable<z.ZodEnum<{
        date: "date";
        commute: "commute";
        casual: "casual";
        formal: "formal";
        outdoor: "outdoor";
    }>>;
    excludeProductIds: z.ZodArray<z.ZodUUID>;
    pairWithProductId: z.ZodNullable<z.ZodUUID>;
}, z.core.$strip>;
export type QueryState = z.infer<typeof QueryState>;
export declare const EMPTY_QUERY_STATE: QueryState;
export declare const ClearableField: z.ZodEnum<{
    category: "category";
    lightness: "lightness";
    warmth: "warmth";
    fit: "fit";
    colorFamilies: "colorFamilies";
    occasion: "occasion";
    price: "price";
    pairWith: "pairWith";
}>;
export type ClearableField = z.infer<typeof ClearableField>;
/**
 * 조건 변경 연산. 필드마다 연산을 따로 둔다.
 * 제네릭 set(field, value)보다 LLM 추출이 정확하고, strict 툴 스키마로 값 타입까지 강제된다.
 */
export declare const QueryOp: z.ZodDiscriminatedUnion<[z.ZodObject<{
    op: z.ZodLiteral<"set_category">;
    value: z.ZodEnum<{
        outer_jacket: "outer_jacket";
        outer_coat: "outer_coat";
        outer_blouson: "outer_blouson";
        setup: "setup";
        shirt: "shirt";
        knit: "knit";
        pants: "pants";
    }>;
}, z.core.$strip>, z.ZodObject<{
    op: z.ZodLiteral<"set_price_max">;
    valueMinor: z.ZodNumber;
}, z.core.$strip>, z.ZodObject<{
    op: z.ZodLiteral<"set_price_min">;
    valueMinor: z.ZodNumber;
}, z.core.$strip>, z.ZodObject<{
    op: z.ZodLiteral<"cheaper_than_focused">;
}, z.core.$strip>, z.ZodObject<{
    op: z.ZodLiteral<"set_colors">;
    values: z.ZodArray<z.ZodEnum<{
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
    }>>;
}, z.core.$strip>, z.ZodObject<{
    op: z.ZodLiteral<"adjust_lightness">;
    delta: z.ZodNumber;
}, z.core.$strip>, z.ZodObject<{
    op: z.ZodLiteral<"adjust_warmth">;
    delta: z.ZodNumber;
}, z.core.$strip>, z.ZodObject<{
    op: z.ZodLiteral<"set_warmth">;
    value: z.ZodNumber;
}, z.core.$strip>, z.ZodObject<{
    op: z.ZodLiteral<"set_fit">;
    value: z.ZodEnum<{
        slim: "slim";
        regular: "regular";
        relaxed: "relaxed";
        oversized: "oversized";
    }>;
}, z.core.$strip>, z.ZodObject<{
    op: z.ZodLiteral<"set_occasion">;
    value: z.ZodEnum<{
        date: "date";
        commute: "commute";
        casual: "casual";
        formal: "formal";
        outdoor: "outdoor";
    }>;
}, z.core.$strip>, z.ZodObject<{
    op: z.ZodLiteral<"exclude">;
    productIds: z.ZodArray<z.ZodUUID>;
}, z.core.$strip>, z.ZodObject<{
    op: z.ZodLiteral<"pair_with">;
    productId: z.ZodUUID;
    category: z.ZodEnum<{
        outer_jacket: "outer_jacket";
        outer_coat: "outer_coat";
        outer_blouson: "outer_blouson";
        setup: "setup";
        shirt: "shirt";
        knit: "knit";
        pants: "pants";
    }>;
}, z.core.$strip>, z.ZodObject<{
    op: z.ZodLiteral<"clear">;
    field: z.ZodEnum<{
        category: "category";
        lightness: "lightness";
        warmth: "warmth";
        fit: "fit";
        colorFamilies: "colorFamilies";
        occasion: "occasion";
        price: "price";
        pairWith: "pairWith";
    }>;
}, z.core.$strip>], "op">;
export type QueryOp = z.infer<typeof QueryOp>;
/** 조건 추출기(LLM)의 출력. 빈 배열 = 조건을 못 알아들음 (미수렴 턴으로 센다). */
export declare const QueryDiff: z.ZodObject<{
    ops: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
        op: z.ZodLiteral<"set_category">;
        value: z.ZodEnum<{
            outer_jacket: "outer_jacket";
            outer_coat: "outer_coat";
            outer_blouson: "outer_blouson";
            setup: "setup";
            shirt: "shirt";
            knit: "knit";
            pants: "pants";
        }>;
    }, z.core.$strip>, z.ZodObject<{
        op: z.ZodLiteral<"set_price_max">;
        valueMinor: z.ZodNumber;
    }, z.core.$strip>, z.ZodObject<{
        op: z.ZodLiteral<"set_price_min">;
        valueMinor: z.ZodNumber;
    }, z.core.$strip>, z.ZodObject<{
        op: z.ZodLiteral<"cheaper_than_focused">;
    }, z.core.$strip>, z.ZodObject<{
        op: z.ZodLiteral<"set_colors">;
        values: z.ZodArray<z.ZodEnum<{
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
        }>>;
    }, z.core.$strip>, z.ZodObject<{
        op: z.ZodLiteral<"adjust_lightness">;
        delta: z.ZodNumber;
    }, z.core.$strip>, z.ZodObject<{
        op: z.ZodLiteral<"adjust_warmth">;
        delta: z.ZodNumber;
    }, z.core.$strip>, z.ZodObject<{
        op: z.ZodLiteral<"set_warmth">;
        value: z.ZodNumber;
    }, z.core.$strip>, z.ZodObject<{
        op: z.ZodLiteral<"set_fit">;
        value: z.ZodEnum<{
            slim: "slim";
            regular: "regular";
            relaxed: "relaxed";
            oversized: "oversized";
        }>;
    }, z.core.$strip>, z.ZodObject<{
        op: z.ZodLiteral<"set_occasion">;
        value: z.ZodEnum<{
            date: "date";
            commute: "commute";
            casual: "casual";
            formal: "formal";
            outdoor: "outdoor";
        }>;
    }, z.core.$strip>, z.ZodObject<{
        op: z.ZodLiteral<"exclude">;
        productIds: z.ZodArray<z.ZodUUID>;
    }, z.core.$strip>, z.ZodObject<{
        op: z.ZodLiteral<"pair_with">;
        productId: z.ZodUUID;
        category: z.ZodEnum<{
            outer_jacket: "outer_jacket";
            outer_coat: "outer_coat";
            outer_blouson: "outer_blouson";
            setup: "setup";
            shirt: "shirt";
            knit: "knit";
            pants: "pants";
        }>;
    }, z.core.$strip>, z.ZodObject<{
        op: z.ZodLiteral<"clear">;
        field: z.ZodEnum<{
            category: "category";
            lightness: "lightness";
            warmth: "warmth";
            fit: "fit";
            colorFamilies: "colorFamilies";
            occasion: "occasion";
            price: "price";
            pairWith: "pairWith";
        }>;
    }, z.core.$strip>], "op">>;
}, z.core.$strip>;
export type QueryDiff = z.infer<typeof QueryDiff>;
//# sourceMappingURL=query-state.d.ts.map