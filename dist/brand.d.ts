import { z } from 'zod';
export declare const ShipRequest: z.ZodObject<{
    carrier: z.ZodString;
    trackingNo: z.ZodString;
}, z.core.$strip>;
export type ShipRequest = z.infer<typeof ShipRequest>;
export declare const BrandOrderItemView: z.ZodObject<{
    orderItemId: z.ZodUUID;
    orderId: z.ZodUUID;
    paidAt: z.ZodISODateTime;
    productName: z.ZodString;
    sizeLabel: z.ZodString;
    color: z.ZodString;
    qty: z.ZodNumber;
    lineTotalMinor: z.ZodNumber;
    payableMinor: z.ZodNumber;
    shipment: z.ZodNullable<z.ZodObject<{
        carrier: z.ZodString;
        trackingNo: z.ZodString;
        shippedAt: z.ZodISODateTime;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type BrandOrderItemView = z.infer<typeof BrandOrderItemView>;
/** 정산 — 원장(ledger)에서 계산한다. 원장이 유일한 원본이다 */
export declare const SettlementView: z.ZodObject<{
    brandId: z.ZodUUID;
    salesMinor: z.ZodNumber;
    commissionMinor: z.ZodNumber;
    refundsMinor: z.ZodNumber;
    payableMinor: z.ZodNumber;
    orderItemCount: z.ZodNumber;
}, z.core.$strip>;
export type SettlementView = z.infer<typeof SettlementView>;
export declare const CatalogImportResult: z.ZodObject<{
    productsCreated: z.ZodNumber;
    productsUpdated: z.ZodNumber;
    variantsUpserted: z.ZodNumber;
    errors: z.ZodArray<z.ZodObject<{
        row: z.ZodNumber;
        message: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type CatalogImportResult = z.infer<typeof CatalogImportResult>;
export declare const BrandProductView: z.ZodObject<{
    productId: z.ZodUUID;
    name: z.ZodString;
    category: z.ZodString;
    priceMinor: z.ZodNumber;
    status: z.ZodString;
    variants: z.ZodArray<z.ZodObject<{
        sku: z.ZodString;
        sizeLabel: z.ZodString;
        color: z.ZodString;
        onHand: z.ZodNumber;
        reserved: z.ZodNumber;
    }, z.core.$strip>>;
    hasMeasurements: z.ZodBoolean;
}, z.core.$strip>;
export type BrandProductView = z.infer<typeof BrandProductView>;
export declare const BrandProductStatusRequest: z.ZodObject<{
    status: z.ZodEnum<{
        draft: "draft";
        active: "active";
        archived: "archived";
    }>;
}, z.core.$strip>;
export type BrandProductStatusRequest = z.infer<typeof BrandProductStatusRequest>;
//# sourceMappingURL=brand.d.ts.map