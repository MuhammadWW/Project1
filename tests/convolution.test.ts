import { describe, expect, it } from 'vitest';
import { convolveCT, convolveDT } from '@/lib/math/convolution';
import { ctPresets } from '@/lib/signals/ct';

describe('DT convolution', () => {
  it('matches known short finite sequence', () => {
    const x = { 0: 0.5, 1: 2 };
    const h = { 0: 1, 1: 1, 2: 1 };
    const y = convolveDT(x, h, -1, 5).y;
    expect(y[0]).toBeCloseTo(0.5, 6);
    expect(y[1]).toBeCloseTo(2.5, 6);
    expect(y[2]).toBeCloseTo(2.5, 6);
    expect(y[3]).toBeCloseTo(2, 6);
  });
});

describe('CT convolution', () => {
  it('produces nonnegative output for exp*rect default', () => {
    const res = convolveCT(ctPresets['Default x'], ctPresets['Default h'], -1, 3, 0.01);
    expect(Math.min(...res.y)).toBeGreaterThanOrEqual(-1e-2);
    const idx1 = res.tGrid.findIndex((t) => t >= 0.5);
    const idx2 = res.tGrid.findIndex((t) => t >= 1.5);
    expect(res.y[idx2]).toBeLessThan(res.y[idx1]);
  });
});
