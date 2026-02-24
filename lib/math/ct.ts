import { CTConvolutionStep, CTPrimitive, CTSignal } from './types';

export const evalPrimitive = (p: CTPrimitive, t: number): number => {
  const u = (x: number) => (x >= 0 ? 1 : 0);
  const tau = t - p.shift;
  switch (p.kind) {
    case 'step':
      return p.scale * u(tau);
    case 'rect': {
      const w = p.width ?? 1;
      return p.scale * (Math.abs(tau) <= w / 2 ? 1 : 0);
    }
    case 'exp': {
      const decay = p.decay ?? 1;
      return p.scale * Math.exp(-decay * tau) * u(tau);
    }
    case 'triangle': {
      const w = p.width ?? 1;
      const val = 1 - Math.abs(tau) / (w / 2);
      return p.scale * Math.max(0, val);
    }
    case 'piecewise': {
      if (!p.points?.length) return 0;
      const sorted = [...p.points].sort((a, b) => a.t - b.t);
      for (let i = 0; i < sorted.length - 1; i += 1) {
        if (tau >= sorted[i].t && tau < sorted[i + 1].t) return p.scale * sorted[i].v;
      }
      return 0;
    }
    default:
      return 0;
  }
};

export const sampleCT = (signal: CTSignal, timeArray: number[]) =>
  timeArray.map((t) => signal.primitives.reduce((acc, p) => acc + evalPrimitive(p, t), 0));

export const flipCT = (signal: CTSignal): CTSignal => ({
  ...signal,
  label: `${signal.label} flipped`,
  primitives: signal.primitives.map((p) => ({ ...p, shift: -p.shift })),
});

export const shiftCT = (signal: CTSignal, amount: number): CTSignal => ({
  ...signal,
  label: `${signal.label} shifted`,
  primitives: signal.primitives.map((p) => ({ ...p, shift: p.shift + amount })),
});

export const buildGrid = (min: number, max: number, dt: number, breakpoints: number[]) => {
  const set = new Set<number>();
  for (let t = min; t <= max + 1e-9; t += dt) set.add(Number(t.toFixed(6)));
  breakpoints.forEach((b) => {
    [b - dt / 4, b, b + dt / 4].forEach((v) => {
      if (v >= min && v <= max) set.add(Number(v.toFixed(6)));
    });
  });
  return Array.from(set).sort((a, b) => a - b);
};

const trapezoid = (xs: number[], ys: number[]) => {
  let a = 0;
  for (let i = 0; i < xs.length - 1; i += 1) a += ((ys[i] + ys[i + 1]) * (xs[i + 1] - xs[i])) / 2;
  return a;
};

export const convolveCT = (
  x: CTSignal,
  h: CTSignal,
  tMin: number,
  tMax: number,
  dt = 0.02,
  tauMin = -8,
  tauMax = 8,
) => {
  const breakpoints = [
    ...x.primitives.flatMap((p) => [p.shift, p.shift + (p.width ?? 0) / 2, p.shift - (p.width ?? 0) / 2]),
    ...h.primitives.flatMap((p) => [p.shift, p.shift + (p.width ?? 0) / 2, p.shift - (p.width ?? 0) / 2]),
  ];
  const tGrid = buildGrid(tMin, tMax, dt, breakpoints);
  const tauGrid = buildGrid(tauMin, tauMax, dt, breakpoints);
  const y: Array<{ t: number; y: number }> = [];
  const steps: CTConvolutionStep[] = [];

  tGrid.forEach((t) => {
    const xVals = tauGrid.map((tau) => sampleCT(x, [tau])[0]);
    const hVals = tauGrid.map((tau) => sampleCT(h, [t - tau])[0]);
    const product = xVals.map((v, i) => v * hVals[i]);
    const nz = tauGrid.filter((_, i) => Math.abs(product[i]) > 1e-4);
    const fineTau = buildGrid(tauMin, tauMax, dt / 2, breakpoints);
    const fineProduct = fineTau.map((tau) => sampleCT(x, [tau])[0] * sampleCT(h, [t - tau])[0]);
    const coarseIntegral = trapezoid(tauGrid, product);
    const fineIntegral = trapezoid(fineTau, fineProduct);
    const errorEstimate = Math.abs(fineIntegral - coarseIntegral);
    y.push({ t, y: fineIntegral });
    steps.push({
      t,
      overlap: nz.length ? [Math.min(...nz), Math.max(...nz)] : null,
      integral: fineIntegral,
      errorEstimate,
    });
  });

  return { tGrid, y, steps };
};

export const ctPresets = {
  defaultX: { label: 'e^{-t}u(t)', primitives: [{ kind: 'exp', scale: 1, shift: 0, decay: 1 }] } as CTSignal,
  defaultH: { label: 'rect(t-1/2)', primitives: [{ kind: 'rect', scale: 1, shift: 0.5, width: 1 }] } as CTSignal,
};

export const piecewiseHint = (x: CTSignal, h: CTSignal) => {
  const tags = `${x.label}__${h.label}`;
  if (tags.includes('e^{-t}u(t)') && tags.includes('rect')) {
    return [
      'For t < 0: no overlap, so y(t)=0.',
      'For 0 ≤ t < 1: overlap is τ in [0,t], so y(t)=∫_0^t e^{-τ}dτ=1-e^{-t}.',
      'For t ≥ 1: overlap is τ in [t-1,t], so y(t)=∫_{t-1}^t e^{-τ}dτ=e^{-(t-1)}(1-e^{-1}).',
    ];
  }
  if (tags.includes('rect') && tags.split('rect').length > 2) {
    return ['rect*rect gives a triangle: overlap length grows, peaks, then shrinks linearly.'];
  }
  return ['Use show limits view: find where both x(τ) and h(t-τ) are nonzero, integrate only there.'];
};
