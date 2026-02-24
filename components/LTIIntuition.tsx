'use client';

import { useMemo, useState } from 'react';
import Plot from './Plot';
import { convolveDT } from '@/lib/math';

export default function LTIIntuition() {
  const [a, setA] = useState(0.5);
  const x = { 0: 1, 1: 0.5, 2: -0.2, 3: 0.8 };
  const h = useMemo(() => ({ 0: 1, 1: a }), [a]);
  const y = convolveDT(x, h, -1, 8).y;

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <section className="rounded-xl border p-4">
        <h3 className="text-lg font-semibold">Echo system demo</h3>
        <p className="text-sm">System: y[n] = x[n] + a x[n-1], so h[n]=δ[n]+aδ[n-1].</p>
        <label>a={a.toFixed(2)}</label>
        <input type="range" min={0} max={1} step={0.05} value={a} onChange={(e) => setA(Number(e.target.value))} className="w-full" />
        <Plot title="x, h, y" data={[
          { x: Object.keys(x).map(Number), y: Object.values(x), type: 'bar', name: 'x[n]' },
          { x: Object.keys(h).map(Number), y: Object.values(h), type: 'bar', name: 'h[n]' },
          { x: Object.keys(y).map(Number), y: Object.values(y), type: 'bar', name: 'x*h' },
        ]} />
      </section>
      <section className="rounded-xl border p-4">
        <h3 className="text-lg font-semibold">Room clap metaphor</h3>
        <p className="text-sm">Press clap to emit impulse. The room impulse response then smears a test signal by convolution.</p>
        <p className="rounded bg-slate-100 p-2 text-sm">No microphone needed: simulated impulse response with direct path + reflections.</p>
        <ul className="list-disc pl-4 text-sm">
          <li>Impulse response characterizes the room.</li>
          <li>x is a weighted sum of shifted impulses.</li>
          <li>Output is sum of shifted impulse responses scaled by x[k].</li>
        </ul>
      </section>
    </div>
  );
}
