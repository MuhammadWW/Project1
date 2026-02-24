'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { encodeState } from '@/lib/serialization/urlState';
import { useLabStore } from '@/lib/store';

const tabs = [
  ['dt', 'Discrete Time'],
  ['ct', 'Continuous Time'],
  ['lti', 'LTI Intuition'],
  ['props', 'Properties'],
  ['practice', 'Practice'],
] as const;

export default function Header() {
  const { tab, setTab, n, t, xDT, hDT } = useLabStore();

  const shareURL = useMemo(() => {
    const qs = encodeState({ tab, n, t, x: xDT, h: hDT });
    if (typeof window === 'undefined') return `?${qs}`;
    return `${window.location.origin}?${qs}`;
  }, [tab, n, t, xDT, hDT]);

  const downloadReport = () => {
    const body = `Convolution Lab report\nTab=${tab}\nn=${n}, t=${t}\nx=${JSON.stringify(xDT)}\nh=${JSON.stringify(hDT)}\nSteps: flip, shift, multiply, add/integrate.`;
    const blob = new Blob([body], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'convolution-lab-report.txt';
    a.click();
  };

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0a0d18]/70 px-4 py-3 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Convolution Lab</h1>
          <p className="text-xs text-slate-300">Flip, slide, multiply, add — convolution finally makes sense.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => navigator.clipboard.writeText(shareURL)} className="rounded-full border border-cyan-300/30 bg-cyan-400/10 px-4 py-2 text-xs font-medium text-cyan-100 transition hover:bg-cyan-400/20">Save share</button>
          <button onClick={downloadReport} className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-medium text-white transition hover:bg-white/10">Export report</button>
        </div>
      </div>
      <nav className="mx-auto mt-3 flex max-w-7xl flex-wrap gap-2">
        {tabs.map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)} className="relative rounded-full px-4 py-2 text-xs font-medium text-slate-100">
            {tab === id && (
              <motion.span
                layoutId="activeTab"
                className="absolute inset-0 rounded-full border border-violet-300/40 bg-violet-500/20"
                transition={{ type: 'spring', stiffness: 320, damping: 30 }}
              />
            )}
            <span className="relative z-10">{label}</span>
          </button>
        ))}
      </nav>
    </header>
  );
}
