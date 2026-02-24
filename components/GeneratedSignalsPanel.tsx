'use client';

import { useMemo } from 'react';
import Plot from './Plot';

export default function GeneratedSignalsPanel() {
  const { t, a, b } = useMemo(() => {
    const t = Array.from({ length: 180 }, (_, i) => -2 + (8 * i) / 179);
    const a = t.map((v) => Math.exp(-Math.max(v, 0)) * Math.sin(3.4 * v));
    const b = t.map((v) => (Math.abs(v - 1) < 0.8 ? 1 : 0));
    return { t, a, b };
  }, []);

  return (
    <section className="grid gap-3 rounded-3xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl lg:grid-cols-2">
      <Plot
        title="Generated CT template: e^{-t}u(t) · sin(3.4t)"
        data={[{ x: t, y: a, mode: 'lines', type: 'scatter', name: 'template', line: { color: '#22d3ee', width: 2 } }]}
      />
      <Plot
        title="Generated window pulse"
        data={[{ x: t, y: b, mode: 'lines', type: 'scatter', name: 'window', line: { color: '#f472b6', width: 2 } }]}
      />
    </section>
  );
}
