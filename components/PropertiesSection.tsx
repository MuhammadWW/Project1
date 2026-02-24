'use client';

import { convolveDT } from '@/lib/math';

const Card = ({ title, statement, why, tip }: { title: string; statement: string; why: string; tip: string }) => (
  <div className="rounded-xl border p-3">
    <h4 className="font-semibold">{title}</h4>
    <p className="text-sm">{statement}</p>
    <p className="text-sm text-slate-600">Why: {why}</p>
    <p className="text-sm text-indigo-700">Tip: {tip}</p>
  </div>
);

export default function PropertiesSection() {
  const x = { 0: 1, 1: 2 };
  const d = { 0: 1 };
  const id = convolveDT(x, d, 0, 2).y;
  return (
    <div className="space-y-3">
      <Card title="Identity" statement="x*δ=x" why="δ picks values without smearing." tip={`Example x*δ -> ${JSON.stringify(id)}`} />
      <Card title="Commutativity" statement="x*h=h*x" why="change variable in sum/integral." tip="Flip/shift whichever signal is easier." />
      <Card title="Distributivity" statement="x*(h1+h2)=x*h1+x*h2" why="convolution is linear." tip="Split complicated h into easy pieces." />
      <Card title="Associativity" statement="(x*h1)*h2=x*(h1*h2)" why="cascade LTI systems can be regrouped." tip="Precompute equivalent filter." />
      <Card title="Support rule" statement="Finite lengths add: Ly=Lx+Lh-1" why="overlap starts at first-first and ends last-last." tip="Quick nonzero boundary check in exams." />
    </div>
  );
}
