'use client';

import { useState } from 'react';
import { practiceProblems } from '@/content/practice';
import { useLabStore } from '@/lib/store';

export default function PracticeSection() {
  const [selected, setSelected] = useState(practiceProblems[0]);
  const [answer, setAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const { examMode, setExamMode } = useLabStore();
  const correct = answer.toLowerCase().includes(selected.expected.toLowerCase().slice(0, 4));

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <aside className="rounded-xl border p-3">
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={examMode} onChange={(e) => setExamMode(e.target.checked)} />Exam mode</label>
        {practiceProblems.map((p) => (
          <button key={p.id} onClick={() => { setSelected(p); setAnswer(''); setShowHint(false); }} className="mt-2 block w-full rounded border p-2 text-left text-sm">
            {p.domain}: {p.title}
          </button>
        ))}
      </aside>
      <section className="rounded-xl border p-4 lg:col-span-2">
        <h3 className="text-lg font-semibold">{selected.title}</h3>
        <p className="text-sm">{selected.prompt}</p>
        <textarea value={answer} onChange={(e) => setAnswer(e.target.value)} className="mt-3 h-24 w-full rounded border p-2" placeholder="Type your y[n] or y(t) reasoning..." />
        <div className="mt-2 flex gap-2">
          <button className="rounded bg-indigo-600 px-3 py-1 text-white" onClick={() => setShowHint(true)}>Check answer</button>
          {!examMode && <button className="rounded border px-3 py-1" onClick={() => setShowHint((v) => !v)}>Hint</button>}
        </div>
        {showHint && (
          <div className="mt-3 rounded bg-slate-50 p-3 text-sm">
            <p>{correct ? 'Nice! Looks correct.' : 'Not quite yet. Revisit flip/shift/overlap limits.'}</p>
            {!examMode && <ul className="list-disc pl-4">{selected.hints.map((h) => <li key={h}>{h}</li>)}</ul>}
            <p className="mt-2">Full solution target: {selected.expected}</p>
          </div>
        )}
      </section>
    </div>
  );
}
