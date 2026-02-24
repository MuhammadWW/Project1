import { DTSignal } from '@/lib/math/types';
import { buildDTFromPoints, serializeDT } from '@/lib/signals';

export interface ShareState {
  tab: string;
  n: number;
  t: number;
  x: DTSignal;
  h: DTSignal;
}

export const encodeState = (state: ShareState) => {
  const params = new URLSearchParams();
  params.set('tab', state.tab);
  params.set('n', String(state.n));
  params.set('t', String(state.t));
  params.set('x', serializeDT(state.x));
  params.set('h', serializeDT(state.h));
  return params.toString();
};

export const decodeState = (query: string): Partial<ShareState> => {
  const p = new URLSearchParams(query.startsWith('?') ? query : `?${query}`);
  return {
    tab: p.get('tab') ?? undefined,
    n: Number(p.get('n') ?? 0),
    t: Number(p.get('t') ?? 0),
    x: p.get('x') ? buildDTFromPoints(p.get('x')!) : undefined,
    h: p.get('h') ? buildDTFromPoints(p.get('h')!) : undefined,
  };
};
