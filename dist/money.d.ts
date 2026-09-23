import { z } from 'zod';
/**
 * 금액은 전부 원 단위 정수다. 원화는 소수 단위가 없으므로 minor unit = 1원.
 *
 * DB에서는 bigint로 저장하지만 JSON에서는 number로 주고받는다.
 * Number.MAX_SAFE_INTEGER(약 9천조 원)까지 정확하므로 주문·정산 금액에는 충분하다.
 * (float 연산을 막는 게 목적이지, bigint를 전선까지 끌고 오는 게 목적이 아니다.)
 *
 * 원시 타입에는 meta id를 달지 않는다 — id가 있으면 JSON Schema $defs로 빠지고,
 * Python 생성기가 RootModel 래퍼를 만들어 `.root`로 꺼내야 하게 된다.
 */
export declare const MinorAmount: z.ZodNumber;
export type MinorAmount = z.infer<typeof MinorAmount>;
/** 수수료율 — basis point 정수. 1200 = 12%. 퍼센트 소수를 쓰지 않기 위해서다. */
export declare const CommissionBps: z.ZodNumber;
export type CommissionBps = z.infer<typeof CommissionBps>;
//# sourceMappingURL=money.d.ts.map