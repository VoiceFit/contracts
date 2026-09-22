import { z } from 'zod';
import { QueryState } from './query-state.js';

/**
 * 웹 → 대화 에이전트 메시지 (WebSocket). 에이전트는 UiPatch로 답한다.
 * 음성 모드에서는 user_text 대신 오디오가 LiveKit으로 들어가고, 나머지 메시지는 같다.
 */
export const ClientMessage = z
  .discriminatedUnion('type', [
    z.object({ type: z.literal('user_text'), text: z.string().trim().min(1).max(300) }).meta({ title: 'UserTextMessage' }),
    /** 3턴 미수렴 폴백 화면에서 필터로 조건을 고쳤을 때 */
    z.object({ type: z.literal('apply_filters'), query: QueryState }).meta({ title: 'ApplyFiltersMessage' }),
    /** 목록에서 상품을 눌렀을 때 — 「1번 자세히」와 같다 */
    z.object({ type: z.literal('select_product'), productId: z.uuid() }).meta({ title: 'SelectProductMessage' }),
    z.object({ type: z.literal('ask_size'), productId: z.uuid() }).meta({ title: 'AskSizeMessage' }),
    /** 상세 화면에서 사이즈를 눌러 담았을 때. 대화로 담은 것과 같은 경로로 가야 지표가 맞는다 */
    z.object({ type: z.literal('add_to_cart'), variantId: z.uuid() }).meta({ title: 'AddToCartMessage' }),
  ])
  .meta({ id: 'ClientMessage' });
export type ClientMessage = z.infer<typeof ClientMessage>;
