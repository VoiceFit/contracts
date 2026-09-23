import { z } from 'zod';
import { MinorAmount } from './money.js';
export const ReturnReason = z
    .enum(['size_small', 'size_large', 'color', 'quality', 'changed_mind', 'other'])
    .meta({ id: 'ReturnReason' });
export const ReturnStatus = z.enum(['requested', 'approved', 'rejected', 'refunded']).meta({ id: 'ReturnStatus' });
export const CreateReturnRequest = z
    .object({
    orderItemId: z.uuid(),
    reasonCode: ReturnReason,
    reasonText: z.string().trim().max(300).optional(),
})
    .meta({ id: 'CreateReturnRequest' });
export const ReturnView = z
    .object({
    id: z.uuid(),
    orderId: z.uuid(),
    orderItemId: z.uuid(),
    productName: z.string(),
    sizeLabel: z.string(),
    reasonCode: ReturnReason,
    reasonText: z.string().nullable(),
    status: ReturnStatus,
    refundMinor: MinorAmount,
    createdAt: z.iso.datetime(),
})
    .meta({ id: 'ReturnView' });
//# sourceMappingURL=returns.js.map