'use client';

import dynamic from 'next/dynamic';

const Plotly: any = dynamic(() => import('react-plotly.js'), { ssr: false });

interface PlotProps {
  data: any[];
  title: string;
  height?: number;
  shapes?: any[];
}

export default function Plot({ data, title, height = 230, shapes = [] }: PlotProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-2">
      <Plotly
        data={data}
        layout={{
          title: { text: title, font: { color: '#e2e8f0', size: 14 } },
          paper_bgcolor: 'rgba(0,0,0,0)',
          plot_bgcolor: 'rgba(0,0,0,0)',
          font: { color: '#cbd5e1', size: 11 },
          xaxis: { gridcolor: 'rgba(148,163,184,0.15)', zerolinecolor: 'rgba(148,163,184,0.2)' },
          yaxis: { gridcolor: 'rgba(148,163,184,0.15)', zerolinecolor: 'rgba(148,163,184,0.2)' },
          height,
          margin: { l: 32, r: 20, t: 35, b: 30 },
          showlegend: true,
          legend: { orientation: 'h', y: -0.22 },
          shapes,
        }}
        style={{ width: '100%' }}
        config={{ displaylogo: false, responsive: true }}
      />
    </div>
  );
}
