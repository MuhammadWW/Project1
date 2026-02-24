# Convolution Lab

**Flip, slide, multiply, add, convolution finally makes sense.**

Convolution Lab is a Next.js + TypeScript educational app for Signals and Systems students. It teaches both discrete-time and continuous-time convolution with explicit visual workflow, LTI intuition, properties, and practice mode.

## Features

- Five top-level learning modes:
  - Discrete Time Convolution
  - Continuous Time Convolution
  - LTI Intuition
  - Properties and shortcuts
  - Practice problems
- DT graphical 5-step procedure with live `n` slider and overlap/product/sum display.
- CT graphical 5-step procedure with live `t` slider, overlap focus, and numerical integration.
- Default demos:
  - DT: `x[n] = 0.5δ[n] + 2δ[n-1]`, `h[n] = δ[n] + δ[n-1] + δ[n-2]`
  - CT: `x(t)=e^{-t}u(t)`, `h(t)=rect(t-1/2)`
- LTI echo-system intuition and room-clap metaphor.
- Convolution properties section (identity, commutativity, distributivity, associativity, support).
- Practice bank with 8+ problems and exam mode toggle.
- Shareable URL encoding current app mode.

## Tech Stack

- Next.js (App Router), React, TypeScript
- Tailwind CSS
- Plotly.js (`react-plotly.js`)
- KaTeX (`react-katex`)
- Zustand-ready architecture with hooks/state
- Vitest + React Testing Library
- ESLint + Prettier

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Test and lint

```bash
npm run test
npm run lint
```

## Deploy to Vercel

1. Push repo to GitHub.
2. Import project in Vercel.
3. Framework preset: Next.js.
4. Build command: `npm run build`
5. Output: default Next.js

## Add a new DT/CT preset

1. Edit `lib/signals/dt.ts` or `lib/signals/ct.ts`.
2. Add preset object to exported `dtPresets` or `ctPresets` map.
3. It appears automatically in workspace dropdowns.

## Add a new practice problem

1. Edit `content/guides.ts`.
2. Add a new object to `practiceProblems` with unique `id`, `mode`, and `prompt`.
3. It appears automatically in practice mode selector.

## Project structure

- `app/` routes and layout
- `components/` UI and plot sections
- `lib/math/` convolution engines and helpers
- `lib/signals/` signal primitives and evaluators
- `lib/serialization/` share URL encoding/decoding
- `content/` teaching text and problem bank
- `tests/` unit tests
