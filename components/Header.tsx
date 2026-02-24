'use client';

interface Props { tab: string; setTab: (v: string) => void; onShare: () => void; }
const tabs = ['Discrete Time Convolution', 'Continuous Time Convolution', 'LTI Intuition', 'Properties and shortcuts', 'Practice problems'];

export default function Header({ tab, setTab, onShare }: Props) {
  return (
    <header className="sticky top-0 z-10 border-b bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 p-3">
        <div className="mr-4">
          <h1 className="text-xl font-bold">Convolution Lab</h1>
          <p className="text-xs text-slate-600">Flip, slide, multiply, add, convolution finally makes sense.</p>
        </div>
        {tabs.map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`rounded px-2 py-1 text-sm ${tab === t ? 'bg-slate-900 text-white' : 'bg-slate-100'}`}>{t}</button>
        ))}
        <button className="ml-auto rounded bg-indigo-700 px-3 py-1 text-white" onClick={onShare}>Save share</button>
      </div>
    </header>
  );
}
