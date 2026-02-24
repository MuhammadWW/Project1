import { DTConvolutionStep, DTSignal } from './types';

export const sampleDT = (signal: DTSignal, indices: number[]) => indices.map((i) => signal[i] ?? 0);

export const supportDT = (signal: DTSignal) => {
  const keys = Object.keys(signal)
    .map(Number)
    .filter((k) => Math.abs(signal[k]) > 1e-12)
    .sort((a, b) => a - b);
  if (!keys.length) return null;
  return { min: keys[0], max: keys[keys.length - 1], length: keys.length };
};

export const flipDT = (signal: DTSignal): DTSignal =>
  Object.fromEntries(Object.entries(signal).map(([k, v]) => [-Number(k), v]));

export const shiftDT = (signal: DTSignal, amount: number): DTSignal =>
  Object.fromEntries(Object.entries(signal).map(([k, v]) => [Number(k) + amount, v]));

export const multiplyDT = (a: DTSignal, b: DTSignal): DTSignal => {
  const keys = Array.from(new Set([...Object.keys(a), ...Object.keys(b)].map(Number)));
  return Object.fromEntries(keys.map((k) => [k, (a[k] ?? 0) * (b[k] ?? 0)]));
};

export const convolveDT = (x: DTSignal, h: DTSignal, nMin: number, nMax: number) => {
  const steps: DTConvolutionStep[] = [];
  const y: DTSignal = {};
  const keys = Array.from(new Set([...Object.keys(x), ...Object.keys(h)].map(Number)));
  const kScanMin = Math.min(...keys, nMin - 20);
  const kScanMax = Math.max(...keys, nMax + 20);

  for (let n = nMin; n <= nMax; n += 1) {
    const shiftedH: DTSignal = {};
    const product: DTSignal = {};
    const overlap: number[] = [];
    let sum = 0;

    for (let k = kScanMin; k <= kScanMax; k += 1) {
      const xk = x[k] ?? 0;
      const hnk = h[n - k] ?? 0;
      shiftedH[k] = hnk;
      const wk = xk * hnk;
      product[k] = wk;
      if (Math.abs(wk) > 1e-9) overlap.push(k);
      sum += wk;
    }
    y[n] = Number(sum.toFixed(8));
    steps.push({ n, shiftedH, product, overlap, sum: y[n] });
  }

  return { y, steps, support: supportDT(y) };
};

export const dtPresets = {
  defaultX: { 0: 0.5, 1: 2 } as DTSignal,
  defaultH: { 0: 1, 1: 1, 2: 1 } as DTSignal,
  delta: { 0: 1 } as DTSignal,
  shiftedDelta: { 2: 1 } as DTSignal,
  rect3: { 0: 1, 1: 1, 2: 1 } as DTSignal,
  stepTruncated: Object.fromEntries(Array.from({ length: 6 }, (_, i) => [i, 1])) as DTSignal,
  exp: Object.fromEntries(Array.from({ length: 6 }, (_, i) => [i, Number((0.7 ** i).toFixed(3))])) as DTSignal,
  echo: { 0: 1, 1: 0.5 } as DTSignal,
  random: Object.fromEntries(Array.from({ length: 6 }, (_, i) => [i - 2, Number((Math.random() * 2 - 1).toFixed(2))])) as DTSignal,
};
