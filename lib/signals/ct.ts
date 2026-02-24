import { CTPrimitive, CTSignal } from './types';

export const ctPresets: Record<string, CTSignal> = {
  'Default x': { label: 'e^{-t}u(t)', primitives: [{ type: 'exp', amp: 1, decay: 1, shift: 0 }] },
  'Default h': { label: 'rect(t-1/2)', primitives: [{ type: 'rect', amp: 1, width: 1, center: 0.5 }] },
  Step: { label: 'u(t)', primitives: [{ type: 'step', amp: 1, shift: 0 }] },
  'Shifted step': { label: 'u(t+2)', primitives: [{ type: 'step', amp: 1, shift: -2 }] },
  Rect: { label: 'rect(t)', primitives: [{ type: 'rect', amp: 1, width: 1, center: 0 }] },
  Triangle: { label: 'tri(t)', primitives: [{ type: 'triangle', amp: 1, width: 2, center: 0 }] },
  'Piecewise plateau': {
    label: 'piecewise',
    primitives: [{ type: 'piecewise', points: [{ t: -2, v: 0 }, { t: -1, v: 1 }, { t: 1, v: 1 }, { t: 2, v: 0 }] }]
  }
};

export function evalPrimitive(p: CTPrimitive, t: number): number {
  const amp = p.amp ?? 1;
  if (p.type === 'step') return t >= -(p.shift ?? 0) ? amp : 0;
  if (p.type === 'rect') {
    const c = p.center ?? 0;
    const w = p.width ?? 1;
    return Math.abs(t - c) <= w / 2 ? amp : 0;
  }
  if (p.type === 'exp') {
    const s = p.shift ?? 0;
    const tau = t - s;
    return tau >= 0 ? amp * Math.exp(-(p.decay ?? 1) * tau) : 0;
  }
  if (p.type === 'triangle') {
    const c = p.center ?? 0;
    const w = p.width ?? 2;
    const z = 1 - Math.abs((t - c) / (w / 2));
    return z > 0 ? amp * z : 0;
  }
  const points = p.points ?? [];
  if (points.length < 2) return 0;
  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i];
    const b = points[i + 1];
    if (t >= a.t && t <= b.t) return a.v + ((b.v - a.v) * (t - a.t)) / (b.t - a.t);
  }
  return 0;
}

export function sampleCT(signal: CTSignal, times: number[]): number[] {
  return times.map((t) => signal.primitives.reduce((sum, p) => sum + evalPrimitive(p, t), 0));
}
