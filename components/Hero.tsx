'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

const ThreeSignalModel = dynamic(() => import('./ThreeSignalModel'), { ssr: false });

export default function Hero() {
  return (
    <section className="grid gap-5 rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl lg:grid-cols-2">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="mb-3 inline-flex rounded-full border border-violet-300/30 bg-violet-500/10 px-3 py-1 text-xs text-violet-200">AI Visual Convolution Studio</div>
        <h2 className="text-4xl font-bold leading-tight text-white lg:text-5xl">Make convolution feel mechanical, visual, and obvious.</h2>
        <p className="mt-4 max-w-xl text-sm text-slate-300 lg:text-base">Flip. Slide. Multiply. Add. Explore DT and CT convolution with cinematic visuals, generated graphs, and a live 3D signal object representing overlap dynamics.</p>
        <div className="mt-5 flex flex-wrap gap-2">
          <span className="rounded-full border border-cyan-300/30 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-200">Interactive DT/CT</span>
          <span className="rounded-full border border-pink-300/30 bg-pink-400/10 px-3 py-1 text-xs text-pink-200">Animated Explanations</span>
          <span className="rounded-full border border-emerald-300/30 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-200">Generated Graphs</span>
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.1 }}>
        <ThreeSignalModel />
      </motion.div>
    </section>
  );
}
