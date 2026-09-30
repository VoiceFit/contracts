import { describe, expect, it } from 'vitest';
import { EMPTY_QUERY_STATE, NativeSessionView, UiPatch } from '../src/index.js';

const PRODUCT_ID = '6f1c2a3e-4b5d-4e6f-8a9b-0c1d2e3f4a5b';

describe('UiPatch', () => {
  it('show_list 이벤트를 파싱한다', () => {
    const patch = UiPatch.parse({
      v: 1,
      seq: 3,
      event: {
        type: 'show_list',
        turnId: 't1',
        query: { ...EMPTY_QUERY_STATE, category: 'outer_jacket', priceMaxMinor: 150_000 },
        items: [
          {
            productId: PRODUCT_ID,
            brandName: '노스브릭',
            name: '코튼 워크 자켓',
            category: 'outer_jacket',
            priceMinor: 129_000,
            imageUrl: null,
            colorFamily: 'navy',
          },
        ],
        totalCandidates: 7,
      },
    });
    expect(patch.event.type).toBe('show_list');
  });

  it('알 수 없는 이벤트 타입과 버전은 거부한다 — 클라이언트는 조용히 무시하지 않는다', () => {
    expect(() => UiPatch.parse({ v: 1, seq: 0, event: { type: 'teleport' } })).toThrow();
    expect(() => UiPatch.parse({ v: 2, seq: 0, event: { type: 'agent_state', activity: 'idle' } })).toThrow();
  });

  it('사이즈 조언은 근거가 최소 하나 있어야 한다', () => {
    const base = { type: 'size_advice', productId: PRODUCT_ID, recommendedSize: 'M', confidence: 'high' };
    expect(() => UiPatch.parse({ v: 1, seq: 1, event: { ...base, reasons: [] } })).toThrow();
    expect(UiPatch.parse({ v: 1, seq: 1, event: { ...base, reasons: ['평소 L, 이 브랜드는 크게 나옴'] } }).seq).toBe(1);
  });
});

describe('NativeSessionView', () => {
  it('앱 세션은 토큰·만료·내 정보를 함께 준다', () => {
    const parsed = NativeSessionView.parse({
      token: 'eyJhbGciOiJIUzI1NiJ9.e30.sig',
      expiresAt: '2026-10-07T00:00:00.000Z',
      me: { customerId: '00000000-0000-4000-8000-000000000001', email: 'a@b.c', isAdmin: false, brands: [], hasBodyProfile: false },
    });
    expect(parsed.token).toContain('eyJ');
  });

  it('토큰이 없으면 거절한다 — 앱이 로그인됐다고 착각하면 안 된다', () => {
    expect(NativeSessionView.safeParse({ expiresAt: '2026-10-07T00:00:00.000Z', me: null }).success).toBe(false);
  });
});
