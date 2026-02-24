'use client';

import { useMemo, useState } from 'react';
import { InlineMath } from 'react-katex';
import Plot from './Plot';
import { ctSteps } from '@/content/guides';
import { convolveCT } from '@/lib/math/convolution';
import { ctPresets, sampleCT } from '@/lib/signals/ct';
import { CTSignal } from '@/lib/signals/types';

const range = (a: number, b: number, step: number) => Array.from({ length: Math.floor((b - a) / step) + 1 }, (_, i) => a + i * step);

export default function CTWorkspace() {
  const [x, setX] = useState<CTSignal>(ctPresets['Default x']);
  const [h, setH] = useState<CTSignal>(ctPresets['Default h']);
  const [t, setT] = useState(0.5);
  const [showOverlapOnly, setShowOverlapOnly] = useState(false);
  const tau = useMemo(() => range(-4, 6, 0.02), []);
  const xTau = useMemo(() => sampleCT(x, tau), [x, tau]);
  const hTau = useMemo(() => sampleCT(h, tau), [h, tau]);
  const hFlipped = useMemo(() => sampleCT(h, tau.map((v) => -v)), [h, tau]);
  const hShifted = useMemo(() => sampleCT(h, tau.map((v) => t - v)), [h, tau, t]);
  const product = xTau.map((v, i) => v * hShifted[i]);
  const conv = useMemo(() => convolveCT(x, h, -4, 6, 0.02), [x, h]);
  const overlapIdx = tau.filter((_, i) => Math.abs(product[i]) > 1e-4);

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_2fr_1fr]">
      <div className="panel space-y-2">
        <h3 className="font-bold">CT Builders</h3>
        <select className="w-full rounded border p-2" onChange={(e) => setX(ctPresets[e.target.value])}>{Object.keys(ctPresets).map((k) => <option key={k}>{k}</option>)}</select>
        <select className="w-full rounded border p-2" onChange={(e) => setH(ctPresets[e.target.value])}>{Object.keys(ctPresets).map((k) => <option key={k}>{k}</option>)}</select>
        <label className="flex items-center gap-2"><input type="checkbox" checked={showOverlapOnly} onChange={(e) => setShowOverlapOnly(e.target.checked)} />Show overlap only</label>
      </div>
      <div className="panel space-y-3">
        <div className="flex justify-between"><h3 className="font-bold">CT Convolution Visualizer</h3><span>t={t.toFixed(2)}</span></div>
        <input type="range" min={-4} max={6} step={0.02} value={t} onChange={(e) => setT(Number(e.target.value))} className="w-full" />
        <Plot data={[{ x: tau, y: xTau, type: 'scatter', mode: 'lines', name: 'x(τ)' }, { x: tau, y: hTau, type: 'scatter', mode: 'lines', name: 'h(τ)' }]} layout={{ height: 220, title: 'x(τ), h(τ)' }} config={{ displayModeBar: false }} />
        <Plot data={[{ x: tau, y: hFlipped, type: 'scatter', mode: 'lines', name: 'h(-τ)' }, { x: tau, y: hShifted, type: 'scatter', mode: 'lines', name: 'h(t-τ)' }]} layout={{ height: 220, title: 'Flip + Shift' }} config={{ displayModeBar: false }} />
        <Plot data={[{ x: tau, y: showOverlapOnly ? tau.map((_, i) => (Math.abs(product[i]) > 1e-4 ? product[i] : 0)) : product, type: 'scatter', mode: 'lines', name: 'w_t(τ)' }]} layout={{ height: 220, title: 'Product w_t(τ)' }} config={{ displayModeBar: false }} />
        <Plot data={[{ x: conv.tGrid, y: conv.y, type: 'scatter', mode: 'lines', name: 'y(t)' }, { x: [t], y: [conv.y[Math.round((t + 4) / 0.02)] ?? 0], type: 'scatter', mode: 'markers' }]} layout={{ height: 220, title: 'Output y(t)' }} config={{ displayModeBar: false }} />
      </div>
      <div className="panel space-y-2">
        <h3 className="font-bold">Integration + Steps</h3>
        <div className="rounded bg-slate-100 p-2"><InlineMath math={'y(t)=\\int_{-\\infty}^{\\infty}x(\\tau)h(t-\\tau)d\\tau'} /></div>
        {ctSteps.map((s) => <div key={s.title} className="rounded border p-2"><p className="font-semibold text-sm">{s.title}</p><p className="text-xs">{s.note}</p><p className="text-xs text-rose-700">{s.mistake}</p></div>)}
        <p className="text-sm">Overlap τ range: {overlapIdx.length ? `${overlapIdx[0].toFixed(2)} to ${overlapIdx[overlapIdx.length - 1].toFixed(2)}` : 'none'}</p>
        <p className="text-sm">Numerical error estimate: ±{conv.errorEstimate.toExponential(2)}</p>
        <p className="text-sm">Piecewise helper: detects breakpoints around t=0 and t=1 for rect/exponential demos.</p>
      </div>
    </div>
  );
}
