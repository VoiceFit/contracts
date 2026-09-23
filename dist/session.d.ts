import { z } from 'zod';
/**
 * 웹 → 대화 에이전트 메시지 (WebSocket). 에이전트는 UiPatch로 답한다.
 * 음성 모드에서는 user_text 대신 오디오가 LiveKit으로 들어가고, 나머지 메시지는 같다.
 */
export declare const ClientMessage: z.ZodDiscriminatedUnion<[z.ZodObject<{
    type: z.ZodLiteral<"user_text">;
    text: z.ZodString;
}, z.core.$strip>, z.ZodObject<{
    type: z.ZodLiteral<"apply_filters">;
    query: z.ZodObject<{
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
}, z.core.$strip>, z.ZodObject<{
    type: z.ZodLiteral<"select_product">;
    productId: z.ZodUUID;
}, z.core.$strip>, z.ZodObject<{
    type: z.ZodLiteral<"ask_size">;
    productId: z.ZodUUID;
}, z.core.$strip>, z.ZodObject<{
    type: z.ZodLiteral<"add_to_cart">;
    variantId: z.ZodUUID;
}, z.core.$strip>], "type">;
export type ClientMessage = z.infer<typeof ClientMessage>;
//# sourceMappingURL=session.d.ts.map