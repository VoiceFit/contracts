import { z } from 'zod';
export declare const OrderStatus: z.ZodEnum<{
    pending_payment: "pending_payment";
    paying: "paying";
    paid: "paid";
    cancelled: "cancelled";
    expired: "expired";
}>;
export type OrderStatus = z.infer<typeof OrderStatus>;
export declare const OrderLineInput: z.ZodObject<{
    variantId: z.ZodUUID;
    qty: z.ZodNumber;
}, z.core.$strip>;
export declare const CreateOrderRequest: z.ZodObject<{
    items: z.ZodArray<z.ZodObject<{
        variantId: z.ZodUUID;
        qty: z.ZodNumber;
    }, z.core.$strip>>;
    couponMinor: z.ZodDefault<z.ZodNumber>;
}, z.core.$strip>;
export type CreateOrderRequest = z.infer<typeof CreateOrderRequest>;
export declare const PayOrderRequest: z.ZodObject<{
    paymentKey: z.ZodString;
}, z.core.$strip>;
export type PayOrderRequest = z.infer<typeof PayOrderRequest>;
export declare const OrderItemView: z.ZodObject<{
    id: z.ZodUUID;
    variantId: z.ZodUUID;
    brandId: z.ZodUUID;
    productName: z.ZodString;
    brandName: z.ZodString;
    sizeLabel: z.ZodString;
    qty: z.ZodNumber;
    unitPriceMinor: z.ZodNumber;
    lineTotalMinor: z.ZodNumber;
    couponShareMinor: z.ZodNumber;
    shipment: z.ZodNullable<z.ZodObject<{
        carrier: z.ZodString;
        trackingNo: z.ZodString;
        shippedAt: z.ZodISODateTime;
    }, z.core.$strip>>;
    returnStatus: z.ZodNullable<z.ZodEnum<{
        requested: "requested";
        approved: "approved";
        rejected: "rejected";
        refunded: "refunded";
    }>>;
}, z.core.$strip>;
export declare const OrderView: z.ZodObject<{
    id: z.ZodUUID;
    status: z.ZodEnum<{
        pending_payment: "pending_payment";
        paying: "paying";
        paid: "paid";
        cancelled: "cancelled";
        expired: "expired";
    }>;
    subtotalMinor: z.ZodNumber;
    couponMinor: z.ZodNumber;
    totalMinor: z.ZodNumber;
    items: z.ZodArray<z.ZodObject<{
        id: z.ZodUUID;
        variantId: z.ZodUUID;
        brandId: z.ZodUUID;
        productName: z.ZodString;
        brandName: z.ZodString;
        sizeLabel: z.ZodString;
        qty: z.ZodNumber;
        unitPriceMinor: z.ZodNumber;
        lineTotalMinor: z.ZodNumber;
        couponShareMinor: z.ZodNumber;
        shipment: z.ZodNullable<z.ZodObject<{
            carrier: z.ZodString;
            trackingNo: z.ZodString;
            shippedAt: z.ZodISODateTime;
        }, z.core.$strip>>;
        returnStatus: z.ZodNullable<z.ZodEnum<{
            requested: "requested";
            approved: "approved";
            rejected: "rejected";
            refunded: "refunded";
        }>>;
    }, z.core.$strip>>;
    reservationExpiresAt: z.ZodNullable<z.ZodISODateTime>;
    createdAt: z.ZodISODateTime;
    paidAt: z.ZodNullable<z.ZodISODateTime>;
}, z.core.$strip>;
export type OrderView = z.infer<typeof OrderView>;
export declare const AddCartItemRequest: z.ZodObject<{
    variantId: z.ZodUUID;
    qty: z.ZodDefault<z.ZodNumber>;
}, z.core.$strip>;
export type AddCartItemRequest = z.infer<typeof AddCartItemRequest>;
export declare const CartLineView: z.ZodObject<{
    variantId: z.ZodUUID;
    productId: z.ZodUUID;
    name: z.ZodString;
    brandName: z.ZodString;
    sizeLabel: z.ZodString;
    qty: z.ZodNumber;
    unitPriceMinor: z.ZodNumber;
    lineTotalMinor: z.ZodNumber;
}, z.core.$strip>;
export declare const CartView: z.ZodObject<{
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
export type CartView = z.infer<typeof CartView>;
//# sourceMappingURL=orders.d.ts.map