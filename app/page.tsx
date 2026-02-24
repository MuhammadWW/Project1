'use client';

import AnimatedBackground from '@/components/AnimatedBackground';
import Header from '@/components/Header';
import DTWorkspace from '@/components/DTWorkspace';
import CTWorkspace from '@/components/CTWorkspace';
import LTIIntuition from '@/components/LTIIntuition';
import PropertiesSection from '@/components/PropertiesSection';
import PracticeSection from '@/components/PracticeSection';
import Hero from '@/components/Hero';
import GeneratedSignalsPanel from '@/components/GeneratedSignalsPanel';
import { glossary } from '@/content/explanations';
import { useLabStore } from '@/lib/store';

export default function Page() {
  const { tab, n, t, setN, setT } = useLabStore();

  return (
    <div
      tabIndex={0}
      onKeyDown={(e) => {
        if (tab === 'dt' && e.key === 'ArrowLeft') setN(n - 1);
        if (tab === 'dt' && e.key === 'ArrowRight') setN(n + 1);
        if (tab === 'ct' && e.key === 'ArrowLeft') setT(Number((t - 0.05).toFixed(2)));
        if (tab === 'ct' && e.key === 'ArrowRight') setT(Number((t + 0.05).toFixed(2)));
      }}
      className="min-h-screen"
    >
      <AnimatedBackground />
      <Header />
      <main className="mx-auto max-w-7xl space-y-5 px-4 py-5">
        <Hero />

        <GeneratedSignalsPanel />

        <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-4 shadow-2xl backdrop-blur-xl">
          {tab === 'dt' && <DTWorkspace />}
          {tab === 'ct' && <CTWorkspace />}
          {tab === 'lti' && <LTIIntuition />}
          {tab === 'props' && <PropertiesSection />}
          {tab === 'practice' && <PracticeSection />}
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-4 text-slate-100 shadow-2xl backdrop-blur-xl">
          <h3 className="font-semibold">Inline glossary</h3>
          <div className="mt-2 grid gap-2 md:grid-cols-2">
            {glossary.map(([term, def]) => (
              <div key={term} className="rounded-xl border border-white/10 bg-black/20 p-3 text-sm">
                <strong className="text-cyan-200">{term}</strong>: <span className="text-slate-300">{def}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
