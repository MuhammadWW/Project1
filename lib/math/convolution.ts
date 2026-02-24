import { sampleCT } from '@/lib/signals/ct';
import { CTSignal, DTSignal } from '@/lib/signals/types';

export function flipDT(signal: DTSignal): DTSignal {
  const out: DTSignal = {};
  Object.entries(signal).forEach(([k, v]) => {
    out[-Number(k)] = v;
  });
  return out;
}

export function shiftDT(signal: DTSignal, amount: number): DTSignal {
  const out: DTSignal = {};
  Object.entries(signal).forEach(([k, v]) => {
    out[Number(k) + amount] = v;
  });
  return out;
}

export function convolveDT(x: DTSignal, h: DTSignal, nMin: number, nMax: number) {
  const y: DTSignal = {};
  const details: Record<number, { product: DTSignal; overlap: number[]; value: number }> = {};
  for (let n = nMin; n <= nMax; n++) {
    const product: DTSignal = {};
    const overlap: number[] = [];
    let sum = 0;
    Object.entries(x).forEach(([kStr, xv]) => {
      const k = Number(kStr);
      const hv = h[n - k] ?? 0;
      if (Math.abs(xv * hv) > 1e-12) {
        product[k] = xv * hv;
        overlap.push(k);
        sum += xv * hv;
      }
    });
    y[n] = Number(sum.toFixed(6));
    details[n] = { product, overlap, value: y[n] };
  }
  return { y, details };
}

export function convolveCT(x: CTSignal, h: CTSignal, tMin: number, tMax: number, dt = 0.01) {
  const tGrid: number[] = [];
  for (let t = tMin; t <= tMax + 1e-9; t += dt) tGrid.push(Number(t.toFixed(5)));
  const tauGrid = Array.from({ length: Math.round((tMax - tMin) / dt) + 1 }, (_, i) => tMin + i * dt);
  const xTau = sampleCT(x, tauGrid);
  const y = tGrid.map((t) => {
    const shifted = sampleCT(h, tauGrid.map((tau) => t - tau));
    let acc = 0;
    for (let i = 0; i < tauGrid.length - 1; i++) {
      const a = xTau[i] * shifted[i];
      const b = xTau[i + 1] * shifted[i + 1];
      acc += ((a + b) / 2) * dt;
    }
    return acc;
  });
  const maxAbs = Math.max(1e-6, ...y.map((v) => Math.abs(v)));
  return { tGrid, y, errorEstimate: dt * maxAbs };
}

export function supportDT(signal: DTSignal): [number, number] {
  const ks = Object.keys(signal).map(Number);
  return [Math.min(...ks), Math.max(...ks)];
}
