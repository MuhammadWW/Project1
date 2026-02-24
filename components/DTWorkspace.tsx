'use client';

import { useMemo, useState } from 'react';
import { InlineMath } from 'react-katex';
import Plot from './Plot';
import { dtSteps } from '@/content/guides';
import { convolveDT, flipDT, supportDT } from '@/lib/math/convolution';
import { normalize, scale } from '@/lib/signals/dt';
import { dtPresets, randomFinite } from '@/lib/signals/dt';
import { DTSignal } from '@/lib/signals/types';

const toStem = (s: DTSignal) => ({ x: Object.keys(s).map(Number), y: Object.values(s), type: 'bar' as const });

export default function DTWorkspace() {
  const [x, setX] = useState<DTSignal>(dtPresets['Default x']);
  const [h, setH] = useState<DTSignal>(dtPresets['Default h']);
  const [nRange, setNRange] = useState<[number, number]>([-10, 10]);
  const [n, setN] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);

  const conv = useMemo(() => convolveDT(x, h, nRange[0], nRange[1]), [x, h, nRange]);
  const shifted = useMemo(() => {
    const out: DTSignal = {};
    Object.entries(h).forEach(([k, v]) => (out[n - Number(k)] = v));
    return out;
  }, [h, n]);
  const overlap = conv.details[n]?.overlap ?? [];
  const ySupport = supportDT(conv.y);

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_2fr_1fr]">
      <div className="panel space-y-3">
        <h3 className="font-bold">Signal Builders</h3>
        <select className="w-full rounded border p-2" onChange={(e) => setX(dtPresets[e.target.value] ?? x)}>
          {Object.keys(dtPresets).map((k) => <option key={k}>{k}</option>)}
        </select>
        <select className="w-full rounded border p-2" onChange={(e) => setH(dtPresets[e.target.value] ?? h)}>
          {Object.keys(dtPresets).map((k) => <option key={k}>{k}</option>)}
        </select>
        <button className="rounded bg-slate-800 px-3 py-1 text-white" onClick={() => setX(randomFinite())}>Random x</button>
        <div className="grid grid-cols-2 gap-2">
          <button className="rounded border p-1" onClick={() => setX(normalize(x))}>Normalize x</button>
          <button className="rounded border p-1" onClick={() => setH(scale(h, 2))}>Scale h ×2</button>
        </div>
        <label>n range {nRange[0]} to {nRange[1]}</label>
        <input type="range" min={-20} max={0} value={nRange[0]} onChange={(e) => setNRange([Number(e.target.value), nRange[1]])} />
        <input type="range" min={0} max={20} value={nRange[1]} onChange={(e) => setNRange([nRange[0], Number(e.target.value)])} />
      </div>
      <div className="panel space-y-3">
        <div className="flex items-center justify-between"><h3 className="font-bold">DT Convolution Visualizer</h3><span className="text-sm">n={n}</span></div>
        <input type="range" min={nRange[0]} max={nRange[1]} value={n} onChange={(e) => setN(Number(e.target.value))} className="w-full" />
        <Plot data={[{ ...toStem(x), name: 'x[k]' }, { ...toStem(h), name: 'h[k]' }]} layout={{ height: 220, title: 'x[k] and h[k]' }} config={{ displayModeBar: false }} />
        <Plot data={[{ ...toStem(flipDT(h)), name: 'h[-k]' }, { ...toStem(shifted), name: 'h[n-k]' }]} layout={{ height: 220, title: 'Flip + Shift' }} config={{ displayModeBar: false }} />
        <Plot data={[{ ...toStem(conv.details[n]?.product ?? {}), name: 'w_n[k]' }]} layout={{ height: 220, title: 'Pointwise product' }} config={{ displayModeBar: false }} />
        <Plot data={[{ ...toStem(conv.y), name: 'y[n]' }, { x: [n], y: [conv.y[n] ?? 0], type: 'scatter', mode: 'markers', marker: { size: 12 } }]} layout={{ height: 220, title: 'Output y[n]' }} config={{ displayModeBar: false }} />
      </div>
      <div className="panel space-y-3">
        <h3 className="font-bold">Step Tracker + Math</h3>
        <div className="rounded bg-slate-100 p-2"><InlineMath math={'y[n]=\\sum_{k=-\\infty}^{\\infty}x[k]h[n-k]'} /></div>
        {dtSteps.map((s, i) => (
          <button key={s.title} className={`w-full rounded border p-2 text-left ${i === stepIdx ? 'bg-amber-50 border-amber-400' : ''}`} onClick={() => setStepIdx(i)}>
            <p className="font-semibold">{s.title}</p><p className="text-xs">{s.note}</p><p className="text-xs text-rose-700">Common mistake: {s.mistake}</p>
          </button>
        ))}
        <button className="rounded border p-2" onClick={() => setStepIdx((s) => (s + 1) % 5)}>Next Step</button>
        <p className="text-sm">Overlap k: {overlap.join(', ') || 'none'}</p>
        <p className="text-sm">Current sum: <InlineMath math={`y[${n}]=${(conv.y[n] ?? 0).toFixed(3)}`} /></p>
        <p className="text-sm">Support of y: [{ySupport[0]}, {ySupport[1]}]</p>
        <p className="text-sm">Commutative form: <InlineMath math={'\\sum_k x[n-k]h[k]'} /></p>
      </div>
    </div>
  );
}
