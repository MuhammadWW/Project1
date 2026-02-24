'use client';

import { useMemo, useState } from 'react';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import { convolveCT, sampleCT, ctPresets, piecewiseHint } from '@/lib/math';
import { useLabStore } from '@/lib/store';
import Plot from './Plot';

const linspace = (a: number, b: number, n: number) => Array.from({ length: n }, (_, i) => a + (i * (b - a)) / (n - 1));

export default function CTWorkspace() {
  const { xCT, hCT, t, setT } = useLabStore();
  const [tMin, setTMin] = useState(-2);
  const [tMax, setTMax] = useState(4);
  const [showOverlapOnly, setShowOverlapOnly] = useState(false);
  const tau = useMemo(() => linspace(-3, 5, 300), []);
  const result = useMemo(() => convolveCT(xCT, hCT, tMin, tMax), [xCT, hCT, tMin, tMax]);
  const current = result.steps.reduce((p, c) => (Math.abs(c.t - t) < Math.abs(p.t - t) ? c : p), result.steps[0]);

  const xs = sampleCT(xCT, tau);
  const hs = sampleCT(hCT, tau);
  const shifted = sampleCT(hCT, tau.map((v) => t - v));
  const product = xs.map((v, i) => v * shifted[i]);

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
      <aside className="space-y-3 rounded-xl border p-3 lg:col-span-3">
        <h3 className="font-semibold">CT Inputs</h3>
        <p className="text-sm">Default demo: x(t)=e^-t u(t), h(t)=rect(t-1/2)</p>
        <button className="rounded border px-2 py-1" onClick={() => setShowOverlapOnly((v) => !v)}>Toggle overlap only</button>
        <div className="flex gap-2">
          <input type="number" value={tMin} onChange={(e) => setTMin(Number(e.target.value))} className="w-1/2 rounded border p-1" />
          <input type="number" value={tMax} onChange={(e) => setTMax(Number(e.target.value))} className="w-1/2 rounded border p-1" />
        </div>
      </aside>
      <main className="space-y-3 lg:col-span-6">
        <div className="rounded-xl border p-3">
          <label>t slider: {t.toFixed(2)}</label>
          <input type="range" min={tMin} max={tMax} step={0.01} value={t} onChange={(e) => setT(Number(e.target.value))} className="w-full" />
        </div>
        <Plot title="x(τ), h(τ), h(t-τ)" data={[
          { x: tau, y: xs, type: 'scatter', mode: 'lines', name: 'x(τ)' },
          { x: tau, y: hs, type: 'scatter', mode: 'lines', name: 'h(τ)' },
          { x: tau, y: shifted, type: 'scatter', mode: 'lines', name: 'h(t-τ)' },
        ]} shapes={current.overlap && showOverlapOnly ? [{ type: 'rect', x0: current.overlap[0], x1: current.overlap[1], y0: -2, y1: 2, fillcolor: 'rgba(16,185,129,0.2)', line: { width: 0 } }] : []} />
        <Plot title="w_t(τ)=x(τ)h(t-τ)" data={[{ x: tau, y: product, type: 'scatter', mode: 'lines', name: 'product' }]} />
        <Plot title="y(t)" data={[{ x: result.y.map((p) => p.t), y: result.y.map((p) => p.y), type: 'scatter', mode: 'lines', name: 'y(t)' }, { x: [current.t], y: [current.integral], type: 'scatter', mode: 'markers', name: 'current t' }]} />
      </main>
      <aside className="space-y-3 rounded-xl border p-3 text-sm lg:col-span-3">
        <p><InlineMath math={'y(t)=\\int_{-\\infty}^{\\infty}x(\\tau)h(t-\\tau)d\\tau'} /></p>
        <p>Overlap bounds now: {current.overlap ? `[${current.overlap[0].toFixed(2)}, ${current.overlap[1].toFixed(2)}]` : 'none'}.</p>
        <p>Integral value y({current.t.toFixed(2)}) = {current.integral.toFixed(4)}.</p>
        <p>Error estimate: ±{current.errorEstimate.toExponential(2)}.</p>
        <h4 className="font-semibold">5-step CT procedure</h4>
        <ol className="list-inside list-decimal">{['Use τ variable', 'Flip h(τ)→h(-τ)', 'Shift to h(t-τ)', 'Multiply', 'Integrate'].map((s) => <li key={s}>{s}</li>)}</ol>
        <h4 className="font-semibold">Piecewise helper</h4>
        <ul className="list-disc pl-4">{piecewiseHint(ctPresets.defaultX, ctPresets.defaultH).map((line) => <li key={line}>{line}</li>)}</ul>
      </aside>
    </div>
  );
}
