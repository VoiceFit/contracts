import { describe, expect, it } from 'vitest';
import { CommissionBps, EMPTY_QUERY_STATE, MinorAmount, QueryDiff, QueryState } from '../src/index.js';

describe('MinorAmount', () => {
  it('원 단위 정수만 받는다', () => {
    expect(MinorAmount.parse(129_000)).toBe(129_000);
    expect(() => MinorAmount.parse(129_000.5)).toThrow();
    expect(() => MinorAmount.parse(-1)).toThrow();
  });

  it('JS number가 정확히 표현하는 범위를 넘지 않는다', () => {
    expect(() => MinorAmount.parse(Number.MAX_SAFE_INTEGER + 1)).toThrow();
  });
});

describe('CommissionBps', () => {
  it('0~10000bp 정수', () => {
    expect(CommissionBps.parse(1200)).toBe(1200);
    expect(() => CommissionBps.parse(12.5)).toThrow();
    expect(() => CommissionBps.parse(10_001)).toThrow();
  });
});

describe('QueryState / QueryDiff', () => {
  it('빈 상태가 스키마를 통과한다', () => {
    expect(QueryState.parse(EMPTY_QUERY_STATE)).toEqual(EMPTY_QUERY_STATE);
  });

  it('필드별 연산의 값 타입을 강제한다', () => {
    const ok = QueryDiff.parse({
      ops: [
        { op: 'set_category', value: 'outer_jacket' },
        { op: 'set_price_max', valueMinor: 150_000 },
        { op: 'adjust_lightness', delta: 1 },
      ],
    });
    expect(ok.ops).toHaveLength(3);

    expect(() => QueryDiff.parse({ ops: [{ op: 'set_category', value: 'hat' }] })).toThrow();
    expect(() => QueryDiff.parse({ ops: [{ op: 'adjust_lightness', delta: 5 }] })).toThrow();
    expect(() => QueryDiff.parse({ ops: [{ op: 'set_price_max', valueMinor: 1.5 }] })).toThrow();
  });

  it('못 알아들은 발화는 빈 ops로 표현한다', () => {
    expect(QueryDiff.parse({ ops: [] }).ops).toEqual([]);
  });
});

describe('WaitlistRequest', () => {
  it('동의 없이는 받지 않는다', async () => {
    const { WaitlistRequest } = await import('../src/index.js');
    const r = WaitlistRequest.safeParse({ kind: 'consumer', email: 'a@b.co', consent: false });
    expect(r.success).toBe(false);
    expect(r.error?.issues[0]?.message).toBe('개인정보 수집·이용에 동의해 주세요');
  });

  it('브랜드 문의는 브랜드명이 필요하다', async () => {
    const { WaitlistRequest } = await import('../src/index.js');
    const r = WaitlistRequest.safeParse({ kind: 'brand', email: 'a@b.co', consent: true });
    expect(r.success).toBe(false);
    expect(r.error?.issues[0]?.path).toEqual(['brandName']);
    expect(WaitlistRequest.safeParse({ kind: 'brand', email: 'a@b.co', brandName: '노스브릭', consent: true }).success).toBe(true);
  });
});

describe('WaitlistRequest email', () => {
  it('공백·대문자를 정규화한 뒤 검증한다', async () => {
    const { WaitlistRequest } = await import('../src/index.js');
    const r = WaitlistRequest.parse({ kind: 'consumer', email: '  Tae@Example.COM ', consent: true });
    expect(r.email).toBe('tae@example.com');
    expect(WaitlistRequest.safeParse({ kind: 'consumer', email: 'not an email', consent: true }).success).toBe(false);
  });
});
