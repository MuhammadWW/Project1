import { describe, it, expect } from 'vitest';
import { convolveDT } from '../lib/math';

describe('convolveDT', () => {
  it('matches short known sequence', () => {
    const x = { 0: 1, 1: 2 };
    const h = { 0: 1, 1: 1 };
    const y = convolveDT(x, h, 0, 3).y;
    expect(y[0]).toBe(1);
    expect(y[1]).toBe(3);
    expect(y[2]).toBe(2);
  });

  it('identity with delta', () => {
    const x = { '-1': 2, 0: -1, 2: 0.5 };
    const h = { 0: 1 };
    const y = convolveDT(x, h, -2, 3).y;
    expect(y[-1]).toBe(2);
    expect(y[0]).toBe(-1);
    expect(y[2]).toBe(0.5);
  });
});
