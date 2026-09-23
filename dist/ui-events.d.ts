import { z } from 'zod';
/**
 * 서버(에이전트)가 화면을 주도한다. 클라이언트는 이 이벤트를 리듀서로 적용할 뿐,
 * 어시스턴트 발화 텍스트에서 화면 상태를 역추론하지 않는다.
 *
 * 전송로는 LiveKit 데이터 채널 — 오디오와 같은 연결이라 소리와 화면이 어긋나지 않는다.
 * (docs/architecture/03-voice-turn-sequence.mmd)
 */
export declare const AgentActivity: z.ZodEnum<{
    idle: "idle";
    listening: "listening";
    thinking: "thinking";
    speaking: "speaking";
}>;
export type AgentActivity = z.infer<typeof AgentActivity>;
export declare const SizeConfidence: z.ZodEnum<{
    high: "high";
    medium: "medium";
    low: "low";
}>;
export declare const UiEvent: z.ZodDiscriminatedUnion<[z.ZodObject<{
    type: z.ZodLiteral<"agent_state">;
    activity: z.ZodEnum<{
        idle: "idle";
        listening: "listening";
        thinking: "thinking";
        speaking: "speaking";
    }>;
}, z.core.$strip>, z.ZodObject<{
    type: z.ZodLiteral<"transcript">;
    turnId: z.ZodString;
    role: z.ZodEnum<{
        user: "user";
        assistant: "assistant";
    }>;
    text: z.ZodString;
    final: z.ZodBoolean;
}, z.core.$strip>, z.ZodObject<{
    type: z.ZodLiteral<"show_list">;
    turnId: z.ZodString;
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
    items: z.ZodArray<z.ZodObject<{
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
    }, z.core.$strip>>;
    totalCandidates: z.ZodNumber;
}, z.core.$strip>, z.ZodObject<{
    type: z.ZodLiteral<"list_reasons">;
    turnId: z.ZodString;
    reasons: z.ZodArray<z.ZodObject<{
        productId: z.ZodUUID;
        reason: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>, z.ZodObject<{
    type: z.ZodLiteral<"show_detail">;
    product: z.ZodObject<{
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
}, z.core.$strip>, z.ZodObject<{
    type: z.ZodLiteral<"size_advice">;
    productId: z.ZodUUID;
    recommendedSize: z.ZodString;
    confidence: z.ZodEnum<{
        high: "high";
        medium: "medium";
        low: "low";
    }>;
    reasons: z.ZodArray<z.ZodString>;
}, z.core.$strip>, z.ZodObject<{
    type: z.ZodLiteral<"cart_updated">;
    cart: z.ZodObject<{
        items: z.ZodArray<z.ZodObject<{
            variantId: z.ZodUUID;
            productId: z.ZodUUID;
            name: z.ZodString;
            brandName: z.ZodString;
            sizeLabel: z.ZodString;
            qty: z.ZodNumber;
            unitPriceMinor: z.ZodNumber;
            lineTotalMinor: z.ZodNumber;
        }, z.core.$strip>>;
        subtotalMinor: z.ZodNumber;
    }, z.core.$strip>;
}, z.core.$strip>, z.ZodObject<{
    type: z.ZodLiteral<"fallback_to_filters">;
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
    reason: z.ZodLiteral<"stalled">;
}, z.core.$strip>, z.ZodObject<{
    type: z.ZodLiteral<"error">;
    code: z.ZodString;
    message: z.ZodString;
}, z.core.$strip>, z.ZodObject<{
    type: z.ZodLiteral<"session">;
    sessionId: z.ZodUUID;
}, z.core.$strip>, z.ZodObject<{
    type: z.ZodLiteral<"request_body_profile">;
    productId: z.ZodUUID;
}, z.core.$strip>], "type">;
export type UiEvent = z.infer<typeof UiEvent>;
/** 전송 봉투. seq로 순서를 보장하고 중복을 버린다. */
export declare const UiPatch: z.ZodObject<{
    v: z.ZodLiteral<1>;
    seq: z.ZodNumber;
    event: z.ZodDiscriminatedUnion<[z.ZodObject<{
        type: z.ZodLiteral<"agent_state">;
        activity: z.ZodEnum<{
            idle: "idle";
            listening: "listening";
            thinking: "thinking";
            speaking: "speaking";
        }>;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodLiteral<"transcript">;
        turnId: z.ZodString;
        role: z.ZodEnum<{
            user: "user";
            assistant: "assistant";
        }>;
        text: z.ZodString;
        final: z.ZodBoolean;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodLiteral<"show_list">;
        turnId: z.ZodString;
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
        items: z.ZodArray<z.ZodObject<{
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
        }, z.core.$strip>>;
        totalCandidates: z.ZodNumber;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodLiteral<"list_reasons">;
        turnId: z.ZodString;
        reasons: z.ZodArray<z.ZodObject<{
            productId: z.ZodUUID;
            reason: z.ZodString;
        }, z.core.$strip>>;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodLiteral<"show_detail">;
        product: z.ZodObject<{
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
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodLiteral<"size_advice">;
        productId: z.ZodUUID;
        recommendedSize: z.ZodString;
        confidence: z.ZodEnum<{
            high: "high";
            medium: "medium";
            low: "low";
        }>;
        reasons: z.ZodArray<z.ZodString>;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodLiteral<"cart_updated">;
        cart: z.ZodObject<{
            items: z.ZodArray<z.ZodObject<{
                variantId: z.ZodUUID;
                productId: z.ZodUUID;
                name: z.ZodString;
                brandName: z.ZodString;
                sizeLabel: z.ZodString;
                qty: z.ZodNumber;
                unitPriceMinor: z.ZodNumber;
                lineTotalMinor: z.ZodNumber;
            }, z.core.$strip>>;
            subtotalMinor: z.ZodNumber;
        }, z.core.$strip>;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodLiteral<"fallback_to_filters">;
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
        reason: z.ZodLiteral<"stalled">;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodLiteral<"error">;
        code: z.ZodString;
        message: z.ZodString;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodLiteral<"session">;
        sessionId: z.ZodUUID;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodLiteral<"request_body_profile">;
        productId: z.ZodUUID;
    }, z.core.$strip>], "type">;
}, z.core.$strip>;
export type UiPatch = z.infer<typeof UiPatch>;
//# sourceMappingURL=ui-events.d.ts.map