import { z } from 'zod';
import { MinorAmount } from './money.js';

export const OrderStatus = z
  .enum(['pending_payment', 'paying', 'paid', 'cancelled', 'expired'])
  .meta({ id: 'OrderStatus' });
export type OrderStatus = z.infer<typeof OrderStatus>;

export const OrderLineInput = z
  .object({
    variantId: z.uuid(),
    qty: z.number().int().min(1).max(10),
  })
  .meta({ id: 'OrderLineInput' });

export const CreateOrderRequest = z
  .object({
    items: z.array(OrderLineInput).min(1).max(20),
    /** 플랫폼 부담 쿠폰. 품목별 비례 배분되고 잔차는 마지막 품목에 간다. */
    couponMinor: MinorAmount.default(0),
  })
  .meta({ id: 'CreateOrderRequest' });
export type CreateOrderRequest = z.infer<typeof CreateOrderRequest>;

export const PayOrderRequest = z
  .object({ paymentKey: z.string().min(1).max(200) })
  .meta({ id: 'PayOrderRequest' });
export type PayOrderRequest = z.infer<typeof PayOrderRequest>;

export const OrderItemView = z
  .object({
    id: z.uuid(),
    variantId: z.uuid(),
    brandId: z.uuid(),
    productName: z.string(),
    brandName: z.string(),
    sizeLabel: z.string(),
    qty: z.number().int().positive(),
    unitPriceMinor: MinorAmount,
    lineTotalMinor: MinorAmount,
    couponShareMinor: MinorAmount,
    shipment: z.object({ carrier: z.string(), trackingNo: z.string(), shippedAt: z.iso.datetime() }).nullable(),
    returnStatus: z.enum(['requested', 'approved', 'rejected', 'refunded']).nullable(),
  })
  .meta({ id: 'OrderItemView' });

export const OrderView = z
  .object({
    id: z.uuid(),
    status: OrderStatus,
    subtotalMinor: MinorAmount,
    couponMinor: MinorAmount,
    totalMinor: MinorAmount,
    items: z.array(OrderItemView),
    /** 결제 대기 중일 때 재고 예약이 풀리는 시각 */
    reservationExpiresAt: z.iso.datetime().nullable(),
    createdAt: z.iso.datetime(),
    paidAt: z.iso.datetime().nullable(),
  })
  .meta({ id: 'OrderView' });
export type OrderView = z.infer<typeof OrderView>;

export const AddCartItemRequest = z
  .object({
    variantId: z.uuid(),
    qty: z.number().int().min(1).max(10).default(1),
  })
  .meta({ id: 'AddCartItemRequest' });
export type AddCartItemRequest = z.infer<typeof AddCartItemRequest>;

export const CartLineView = z
  .object({
    variantId: z.uuid(),
    productId: z.uuid(),
    name: z.string(),
    brandName: z.string(),
    sizeLabel: z.string(),
    qty: z.number().int().positive(),
    unitPriceMinor: MinorAmount,
    lineTotalMinor: MinorAmount,
  })
  .meta({ id: 'CartLineView' });

export const CartView = z
  .object({
    items: z.array(CartLineView),
    subtotalMinor: MinorAmount,
  })
  .meta({ id: 'CartView' });
export type CartView = z.infer<typeof CartView>;
