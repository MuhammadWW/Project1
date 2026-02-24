import { CTSignal, DTSignal } from '@/lib/math/types';

export const cloneDT = (s: DTSignal): DTSignal => Object.fromEntries(Object.entries(s).map(([k, v]) => [Number(k), v]));

export const scaleDT = (s: DTSignal, factor: number): DTSignal =>
  Object.fromEntries(Object.entries(s).map(([k, v]) => [Number(k), Number((v * factor).toFixed(4))]));

export const normalizeDT = (s: DTSignal): DTSignal => {
  const max = Math.max(...Object.values(s).map((v) => Math.abs(v)), 1);
  return scaleDT(s, 1 / max);
};

export const buildDTFromPoints = (text: string): DTSignal => {
  // format: -1:0.5,0:1,1:-0.2
  const out: DTSignal = {};
  text
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .forEach((pair) => {
      const [k, v] = pair.split(':').map(Number);
      if (!Number.isNaN(k) && !Number.isNaN(v)) out[k] = v;
    });
  return out;
};

export const serializeDT = (s: DTSignal) => Object.entries(s).map(([k, v]) => `${k}:${v}`).join(',');

export const combineCT = (signals: CTSignal[]): CTSignal => ({
  label: signals.map((s) => s.label).join(' + '),
  primitives: signals.flatMap((s) => s.primitives),
});
