import { z } from 'zod';
import { ProductCard, ProductDetail } from './catalog.js';
import { CartView } from './orders.js';
import { QueryState } from './query-state.js';
/**
 * 서버(에이전트)가 화면을 주도한다. 클라이언트는 이 이벤트를 리듀서로 적용할 뿐,
 * 어시스턴트 발화 텍스트에서 화면 상태를 역추론하지 않는다.
 *
 * 전송로는 LiveKit 데이터 채널 — 오디오와 같은 연결이라 소리와 화면이 어긋나지 않는다.
 * (docs/architecture/03-voice-turn-sequence.mmd)
 */
export const AgentActivity = z
    .enum(['idle', 'listening', 'thinking', 'speaking'])
    .meta({ id: 'AgentActivity' });
export const SizeConfidence = z.enum(['high', 'medium', 'low']).meta({ id: 'SizeConfidence' });
export const UiEvent = z
    .discriminatedUnion('type', [
    /** 아바타 상태. 장식이 아니라 턴 신호다 — 지금 말해도 되는지 알려준다. */
    z.object({ type: z.literal('agent_state'), activity: AgentActivity }).meta({ title: 'AgentStateEvent' }),
    z.object({
        type: z.literal('transcript'),
        turnId: z.string(),
        role: z.enum(['user', 'assistant']),
        text: z.string(),
        final: z.boolean(),
    }).meta({ title: 'TranscriptEvent' }),
    /** 추천 목록. 이유보다 먼저 나간다 — 화면이 체감 지연을 결정한다. */
    z.object({
        type: z.literal('show_list'),
        turnId: z.string(),
        query: QueryState,
        items: z.array(ProductCard).max(12),
        totalCandidates: z.number().int().nonnegative(),
    }).meta({ title: 'ShowListEvent' }),
    /** 목록 뒤에 스트리밍으로 도착하는 추천 이유. 음성은 120자 캡, 상세는 여기. */
    z.object({
        type: z.literal('list_reasons'),
        turnId: z.string(),
        reasons: z.array(z.object({ productId: z.uuid(), reason: z.string().max(200) })),
    }).meta({ title: 'ListReasonsEvent' }),
    z.object({ type: z.literal('show_detail'), product: ProductDetail }).meta({ title: 'ShowDetailEvent' }),
    z.object({
        type: z.literal('size_advice'),
        productId: z.uuid(),
        recommendedSize: z.string(),
        confidence: SizeConfidence,
        /** 근거 — 설명가능성은 분석 문서의 책임 있는 AI 항목 */
        reasons: z.array(z.string()).min(1),
    }).meta({ title: 'SizeAdviceEvent' }),
    z.object({ type: z.literal('cart_updated'), cart: CartView }).meta({ title: 'CartUpdatedEvent' }),
    /** 3턴 연속 미수렴 — 같은 QueryState로 필터 화면을 연다. */
    z.object({
        type: z.literal('fallback_to_filters'),
        query: QueryState,
        reason: z.literal('stalled'),
    }).meta({ title: 'FallbackToFiltersEvent' }),
    z.object({ type: z.literal('error'), code: z.string(), message: z.string() }).meta({ title: 'ErrorEvent' }),
    /** 연결 직후 — 지표·실험이 이 세션을 가리킬 때 쓴다 */
    z.object({ type: z.literal('session'), sessionId: z.uuid() }).meta({ title: 'SessionEvent' }),
    /** 사이즈를 권하려면 체형이 필요하다 — 웹이 동의 화면을 연다 */
    z.object({ type: z.literal('request_body_profile'), productId: z.uuid() }).meta({ title: 'RequestBodyProfileEvent' }),
])
    .meta({ id: 'UiEvent' });
/** 전송 봉투. seq로 순서를 보장하고 중복을 버린다. */
export const UiPatch = z
    .object({
    v: z.literal(1),
    seq: z.number().int().nonnegative(),
    event: UiEvent,
})
    .meta({ id: 'UiPatch' });
//# sourceMappingURL=ui-events.js.map