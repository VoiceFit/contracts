import { z } from 'zod';
export declare const ReturnReason: z.ZodEnum<{
    color: "color";
    size_small: "size_small";
    size_large: "size_large";
    quality: "quality";
    changed_mind: "changed_mind";
    other: "other";
}>;
export type ReturnReason = z.infer<typeof ReturnReason>;
export declare const ReturnStatus: z.ZodEnum<{
    requested: "requested";
    approved: "approved";
    rejected: "rejected";
    refunded: "refunded";
}>;
export declare const CreateReturnRequest: z.ZodObject<{
    orderItemId: z.ZodUUID;
    reasonCode: z.ZodEnum<{
        color: "color";
        size_small: "size_small";
        size_large: "size_large";
        quality: "quality";
        changed_mind: "changed_mind";
        other: "other";
    }>;
    reasonText: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type CreateReturnRequest = z.infer<typeof CreateReturnRequest>;
export declare const ReturnView: z.ZodObject<{
    id: z.ZodUUID;
    orderId: z.ZodUUID;
    orderItemId: z.ZodUUID;
    productName: z.ZodString;
    sizeLabel: z.ZodString;
    reasonCode: z.ZodEnum<{
        color: "color";
        size_small: "size_small";
        size_large: "size_large";
        quality: "quality";
        changed_mind: "changed_mind";
        other: "other";
    }>;
    reasonText: z.ZodNullable<z.ZodString>;
    status: z.ZodEnum<{
        requested: "requested";
        approved: "approved";
        rejected: "rejected";
        refunded: "refunded";
    }>;
    refundMinor: z.ZodNumber;
    createdAt: z.ZodISODateTime;
}, z.core.$strip>;
export type ReturnView = z.infer<typeof ReturnView>;
//# sourceMappingURL=returns.d.ts.map