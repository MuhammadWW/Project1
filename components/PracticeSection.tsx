'use client';

import { useState } from 'react';
import { practiceProblems } from '@/content/guides';

export default function PracticeSection() {
  const [examMode, setExamMode] = useState(false);
  const [selected, setSelected] = useState(practiceProblems[0].id);
  const [answer, setAnswer] = useState('');
  const current = practiceProblems.find((p) => p.id === selected)!;
  return (
    <div className="panel space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-bold">Practice Tutor</h3>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={examMode} onChange={(e) => setExamMode(e.target.checked)} />Exam mode</label>
      </div>
      <select className="w-full rounded border p-2" value={selected} onChange={(e) => setSelected(e.target.value)}>
        {practiceProblems.map((p) => <option key={p.id} value={p.id}>{p.mode}: {p.prompt}</option>)}
      </select>
      <p className="text-sm">{current.prompt}</p>
      <textarea className="w-full rounded border p-2" rows={4} value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="Enter y[n] or y(t) reasoning" />
      <div className="flex gap-2">
        <button className="rounded bg-emerald-700 px-3 py-1 text-white">Check answer</button>
        {!examMode && <button className="rounded border px-3 py-1">Hint: start with flip step.</button>}
        {!examMode && <button className="rounded border px-3 py-1">Show full step-by-step solution</button>}
      </div>
    </div>
  );
}
