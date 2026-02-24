import { create } from 'zustand';
import { ctPresets, dtPresets } from './math';
import { CTSignal, DTSignal } from './math/types';

interface AppState {
  tab: string;
  n: number;
  t: number;
  xDT: DTSignal;
  hDT: DTSignal;
  xCT: CTSignal;
  hCT: CTSignal;
  examMode: boolean;
  setTab: (tab: string) => void;
  setN: (n: number) => void;
  setT: (t: number) => void;
  setXDT: (x: DTSignal) => void;
  setHDT: (h: DTSignal) => void;
  setExamMode: (v: boolean) => void;
}

export const useLabStore = create<AppState>((set) => ({
  tab: 'dt',
  n: 1,
  t: 0.5,
  xDT: dtPresets.defaultX,
  hDT: dtPresets.defaultH,
  xCT: ctPresets.defaultX,
  hCT: ctPresets.defaultH,
  examMode: false,
  setTab: (tab) => set({ tab }),
  setN: (n) => set({ n }),
  setT: (t) => set({ t }),
  setXDT: (xDT) => set({ xDT }),
  setHDT: (hDT) => set({ hDT }),
  setExamMode: (examMode) => set({ examMode }),
}));
