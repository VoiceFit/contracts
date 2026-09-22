import { z } from 'zod';
import { MinorAmount } from './money.js';

export const ShipRequest = z
  .object({
    carrier: z.string().trim().min(1).max(40),
    trackingNo: z.string().trim().min(4).max(40),
  })
  .meta({ id: 'ShipRequest' });
export type ShipRequest = z.infer<typeof ShipRequest>;

export const BrandOrderItemView = z
  .object({
    orderItemId: z.uuid(),
    orderId: z.uuid(),
    paidAt: z.iso.datetime(),
    productName: z.string(),
    sizeLabel: z.string(),
    color: z.string(),
    qty: z.number().int(),
    lineTotalMinor: MinorAmount,
    payableMinor: MinorAmount,
    shipment: z.object({ carrier: z.string(), trackingNo: z.string(), shippedAt: z.iso.datetime() }).nullable(),
  })
  .meta({ id: 'BrandOrderItemView' });
export type BrandOrderItemView = z.infer<typeof BrandOrderItemView>;

/** 정산 — 원장(ledger)에서 계산한다. 원장이 유일한 원본이다 */
export const SettlementView = z
  .object({
    brandId: z.uuid(),
    salesMinor: MinorAmount,
    commissionMinor: MinorAmount,
    refundsMinor: MinorAmount,
    payableMinor: MinorAmount,
    orderItemCount: z.number().int(),
  })
  .meta({ id: 'SettlementView' });
export type SettlementView = z.infer<typeof SettlementView>;

export const CatalogImportResult = z
  .object({
    productsCreated: z.number().int(),
    productsUpdated: z.number().int(),
    variantsUpserted: z.number().int(),
    errors: z.array(z.object({ row: z.number().int(), message: z.string() })),
  })
  .meta({ id: 'CatalogImportResult' });
export type CatalogImportResult = z.infer<typeof CatalogImportResult>;

export const BrandProductView = z
  .object({
    productId: z.uuid(),
    name: z.string(),
    category: z.string(),
    priceMinor: MinorAmount,
    status: z.string(),
    variants: z.array(z.object({ sku: z.string(), sizeLabel: z.string(), color: z.string(), onHand: z.number().int(), reserved: z.number().int() })),
    hasMeasurements: z.boolean(),
  })
  .meta({ id: 'BrandProductView' });
export type BrandProductView = z.infer<typeof BrandProductView>;

export const BrandProductStatusRequest = z
  .object({ status: z.enum(['draft', 'active', 'archived']) })
  .meta({ id: 'BrandProductStatusRequest' });
export type BrandProductStatusRequest = z.infer<typeof BrandProductStatusRequest>;
