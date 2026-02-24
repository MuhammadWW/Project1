'use client';

import { useMemo, useState } from 'react';
import Plot from './Plot';
import { convolveDT } from '@/lib/math/convolution';

export default function LTIIntuition() {
  const [a, setA] = useState(0.5);
  const x = useMemo(() => ({ 0: 1, 1: 0.5, 2: -0.2, 3: 0.6 }), []);
  const h = useMemo(() => ({ 0: 1, 1: a }), [a]);
  const y = useMemo(() => convolveDT(x, h, -1, 8).y, [h, x]);

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="panel space-y-3">
        <h3 className="font-bold">Echo system demo</h3>
        <p className="text-sm">System: y[n]=x[n]+a x[n-1], so h[n]=δ[n]+aδ[n-1].</p>
        <input type="range" min={-1} max={1} step={0.05} value={a} onChange={(e) => setA(Number(e.target.value))} className="w-full" />
        <p className="text-sm">a={a.toFixed(2)}</p>
        <Plot data={[{ x: Object.keys(x).map(Number), y: Object.values(x), type: 'bar', name: 'x[n]' }, { x: Object.keys(y).map(Number), y: Object.values(y), type: 'bar', name: 'x*h' }]} layout={{ height: 300, title: 'Input and convolved output' }} config={{ displayModeBar: false }} />
      </div>
      <div className="panel space-y-3">
        <h3 className="font-bold">Room clap metaphor</h3>
        <p className="text-sm">Click clap to inject an impulse. The room impulse response spreads energy into echoes, and any sound is modeled by convolution with this response.</p>
        <p className="text-sm">No microphone required: we simulate clap + room impulse response visually.</p>
        <ul className="list-disc pl-5 text-sm">
          <li>Impulse response characterizes an LTI system.</li>
          <li>Any x[n] is weighted impulses.</li>
          <li>Output is weighted sum of shifted h[n].</li>
        </ul>
      </div>
    </div>
  );
}
