'use client';

import { useMemo, useState } from 'react';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import { dtPresets, convolveDT, sampleDT, supportDT } from '@/lib/math';
import { normalizeDT, buildDTFromPoints } from '@/lib/signals';
import { dtSteps } from '@/content/explanations';
import { useLabStore } from '@/lib/store';
import Plot from './Plot';

const range = (a: number, b: number) => Array.from({ length: b - a + 1 }, (_, i) => a + i);

export default function DTWorkspace() {
  const { xDT, hDT, n, setN, setXDT, setHDT } = useLabStore();
  const [nMin, setNMin] = useState(-10);
  const [nMax, setNMax] = useState(10);
  const [stepMode, setStepMode] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [showFlip, setShowFlip] = useState(true);
  const [explainOpen, setExplainOpen] = useState(false);

  const indices = useMemo(() => range(nMin, nMax), [nMin, nMax]);
  const result = useMemo(() => convolveDT(xDT, hDT, nMin, nMax), [xDT, hDT, nMin, nMax]);
  const current = result.steps.find((s) => s.n === n) ?? result.steps[0];

  const toStem = (sig: Record<number, number>, name: string, color: string) => ({
    x: indices,
    y: sampleDT(sig, indices),
    type: 'bar',
    name,
    marker: { color },
  });

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
      <aside className="space-y-3 rounded-xl border p-3 lg:col-span-3">
        <h3 className="font-semibold">DT Inputs</h3>
        <select onChange={(e) => setXDT(dtPresets[e.target.value as keyof typeof dtPresets])} className="w-full rounded border p-2">
          {Object.keys(dtPresets).map((k) => <option key={k}>{k}</option>)}
        </select>
        <textarea className="h-20 w-full rounded border p-2 text-sm" placeholder="x points: -1:1,0:2" onBlur={(e) => e.target.value && setXDT(buildDTFromPoints(e.target.value))} />
        <textarea className="h-20 w-full rounded border p-2 text-sm" placeholder="h points: 0:1,1:1" onBlur={(e) => e.target.value && setHDT(buildDTFromPoints(e.target.value))} />
        <div className="flex gap-2">
          <button onClick={() => setXDT(normalizeDT(xDT))} className="rounded bg-slate-200 px-2 py-1">Normalize x</button>
          <button onClick={() => setHDT(normalizeDT(hDT))} className="rounded bg-slate-200 px-2 py-1">Normalize h</button>
        </div>
        <label className="text-sm">Window n min/max</label>
        <div className="flex gap-2">
          <input type="number" value={nMin} onChange={(e) => setNMin(Number(e.target.value))} className="w-1/2 rounded border p-1" />
          <input type="number" value={nMax} onChange={(e) => setNMax(Number(e.target.value))} className="w-1/2 rounded border p-1" />
        </div>
      </aside>

      <main className="space-y-3 lg:col-span-6">
        <div className="rounded-xl border p-3">
          <div className="flex items-center justify-between">
            <label className="font-medium">n slider: {n}</label>
            <div className="space-x-2">
              <button onClick={() => setN(Math.max(nMin, n - 1))} className="rounded bg-slate-200 px-2">◀</button>
              <button onClick={() => setN(Math.min(nMax, n + 1))} className="rounded bg-slate-200 px-2">▶</button>
            </div>
          </div>
          <input type="range" min={nMin} max={nMax} step={1} value={n} onChange={(e) => setN(Number(e.target.value))} className="w-full" />
          <div className="mt-2 flex gap-2 text-sm">
            <button onClick={() => setShowFlip((v) => !v)} className="rounded border px-2 py-1">toggle h[-k]</button>
            <button onClick={() => setStepMode((v) => !v)} className="rounded border px-2 py-1">step through</button>
            <button onClick={() => setStepIndex((s) => Math.min(4, s + 1))} className="rounded border px-2 py-1">next step</button>
            <button onClick={() => setExplainOpen((v) => !v)} className="rounded border px-2 py-1">Explain what I am seeing</button>
          </div>
        </div>

        <Plot title="x[k], h[k], shifted h[n-k]" data={[toStem(xDT, 'x[k]', '#0ea5e9'), toStem(hDT, 'h[k]', '#334155'), toStem(current.shiftedH, 'h[n-k]', '#f97316'), ...(showFlip ? [toStem(Object.fromEntries(Object.entries(hDT).map(([k, v]) => [-Number(k), v])), 'h[-k]', '#10b981')] : [])]} />
        <Plot title="w_n[k] = x[k]h[n-k]" data={[toStem(current.product, 'w_n[k]', '#ef4444')]} />
        <Plot title="y[n]" data={[toStem(result.y, 'y[n]', '#8b5cf6'), { x: [n], y: [result.y[n] ?? 0], mode: 'markers', marker: { size: 12, symbol: 'diamond' }, name: 'current n', type: 'scatter' }]} />

        {explainOpen && (
          <div className="rounded-lg border bg-slate-50 p-3 text-sm">
            At n={n}, overlap indices are [{current.overlap.join(', ')}]. Multiply gives w_n[k], then summing gives y[{n}]={current.sum.toFixed(3)}.
          </div>
        )}
      </main>

      <aside className="space-y-3 rounded-xl border p-3 lg:col-span-3">
        <h3 className="font-semibold">Step Tracker + Math</h3>
        <p className="text-sm"><InlineMath math={'y[n]=\\sum_{k=-\\infty}^{\\infty}x[k]h[n-k]'} /></p>
        <p className="text-sm"><InlineMath math={'=\\sum_{k=-\\infty}^{\\infty}x[n-k]h[k]'} /> (commutativity)</p>
        <p className="text-sm">Computed overlap limits: k from {current.overlap[0] ?? '—'} to {current.overlap.at(-1) ?? '—'}.</p>
        <p className="text-sm">Finite support of y: {JSON.stringify(supportDT(result.y))}</p>
        {dtSteps.map((s, idx) => (
          <div key={s.title} className={`rounded border p-2 text-xs ${(!stepMode || stepIndex === idx) ? 'bg-amber-50' : ''}`}>
            <div className="font-semibold">{s.title}</div>
            <div>{s.description}</div>
            <div className="font-mono">{s.formula}</div>
            <div className="text-rose-600">{s.mistake}</div>
          </div>
        ))}
      </aside>
    </div>
  );
}
