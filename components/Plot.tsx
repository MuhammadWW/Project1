'use client';

import dynamic from 'next/dynamic';

const PlotlyAny = dynamic(() => import('react-plotly.js'), { ssr: false }) as any;

export default function Plot(props: any) {
  return <PlotlyAny {...props} />;
}
