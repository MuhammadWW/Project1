'use client';

import { useEffect, useMemo, useState } from 'react';
import Header from '@/components/Header';
import DTWorkspace from '@/components/DTWorkspace';
import CTWorkspace from '@/components/CTWorkspace';
import LTIIntuition from '@/components/LTIIntuition';
import PropertiesSection from '@/components/PropertiesSection';
import PracticeSection from '@/components/PracticeSection';
import { decodeState, encodeState } from '@/lib/serialization/urlState';

export default function HomePage() {
  const [tab, setTab] = useState('Discrete Time Convolution');
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const state = decodeState<{ tab: string }>(params.get('state'));
    if (state?.tab) setTab(state.tab);
  }, []);

  const body = useMemo(() => {
    if (tab === 'Discrete Time Convolution') return <DTWorkspace />;
    if (tab === 'Continuous Time Convolution') return <CTWorkspace />;
    if (tab === 'LTI Intuition') return <LTIIntuition />;
    if (tab === 'Properties and shortcuts') return <PropertiesSection />;
    return <PracticeSection />;
  }, [tab]);

  const onShare = () => {
    const state = encodeState({ tab });
    const url = `${window.location.origin}?state=${state}`;
    navigator.clipboard.writeText(url);
    alert('Share URL copied to clipboard');
  };

  return (
    <main>
      <Header tab={tab} setTab={setTab} onShare={onShare} />
      <div className="mx-auto max-w-7xl space-y-4 p-4">
        <button className="rounded border px-3 py-1 text-sm">Explain what I am seeing: At this index/time, we flip h, shift to align overlap, multiply pointwise, then sum/integrate.</button>
        {body}
      </div>
    </main>
  );
}
