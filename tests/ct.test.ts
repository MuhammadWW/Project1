import { describe, it, expect } from 'vitest';
import { convolveCT, ctPresets } from '../lib/math';

describe('convolveCT', () => {
  it('exp * rect has 3-region behavior around zero', () => {
    const r = convolveCT(ctPresets.defaultX, ctPresets.defaultH, -0.2, 1.2, 0.05);
    const yNeg = r.y.find((p) => p.t < 0)?.y ?? 0;
    const yMid = r.y.find((p) => p.t > 0.4 && p.t < 0.6)?.y ?? 0;
    const yHigh = r.y.find((p) => p.t > 1.05)?.y ?? 0;
    expect(Math.abs(yNeg)).toBeLessThan(0.08);
    expect(yMid).toBeGreaterThan(0.2);
    expect(yHigh).toBeGreaterThan(0.2);
  });
});
