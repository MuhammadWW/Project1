import { DTSignal } from './types';

export const dtPresets: Record<string, DTSignal> = {
  'Default x': { 0: 0.5, 1: 2 },
  'Default h': { 0: 1, 1: 1, 2: 1 },
  Delta: { 0: 1 },
  'Shifted delta': { 2: 1 },
  Rect3: { 0: 1, 1: 1, 2: 1 },
  'Truncated step': { 0: 1, 1: 1, 2: 1, 3: 1, 4: 1 },
  'Exponential 0.8^n': { 0: 1, 1: 0.8, 2: 0.64, 3: 0.512, 4: 0.4096 },
  Echo: { 0: 1, 1: 0.6 }
};

export function normalize(signal: DTSignal): DTSignal {
  const max = Math.max(1e-9, ...Object.values(signal).map((v) => Math.abs(v)));
  return Object.fromEntries(Object.entries(signal).map(([k, v]) => [Number(k), v / max]));
}

export function scale(signal: DTSignal, factor: number): DTSignal {
  return Object.fromEntries(Object.entries(signal).map(([k, v]) => [Number(k), v * factor]));
}

export function randomFinite(min = -2, max = 4): DTSignal {
  const out: DTSignal = {};
  for (let k = min; k <= max; k++) if (Math.random() > 0.35) out[k] = Number((Math.random() * 2 - 1).toFixed(2));
  if (Object.keys(out).length === 0) out[0] = 1;
  return out;
}
