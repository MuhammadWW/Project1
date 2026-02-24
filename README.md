# Convolution Lab

**Pitch:** Flip, slide, multiply, add, convolution finally makes sense.

Convolution Lab is an interactive Signals and Systems teaching app built with Next.js + TypeScript + Tailwind + Plotly. It provides visual, step-by-step DT and CT convolution workflows, LTI intuition modules, properties/shortcuts, and a tutor-like practice bank.

## Features

- Mode switcher tabs:
  - Discrete Time Convolution
  - Continuous Time Convolution
  - LTI Intuition
  - Properties and shortcuts
  - Practice problems
- DT workspace:
  - Editable/preset `x[n]` and `h[n]`
  - Flip (`h[-k]`), shift (`h[n-k]`), multiply (`w_n[k]`), sum to `y[n]`
  - Slider, step tracker, overlap indices, common mistakes
- CT workspace:
  - Preset piecewise primitives
  - Flip/shift/multiply/integrate visuals
  - Overlap bounds shading, numeric integration + error estimate
  - Piecewise reasoning helper for common combinations
- LTI intuition:
  - Echo demo `y[n]=x[n]+a x[n-1]`
  - Room clap metaphor module
- Properties section:
  - Identity, commutativity, distributivity, associativity, support rule
- Practice section:
  - 8 problems (DT + CT)
  - Hints, exam mode, feedback panel
- Export/share:
  - Text report export
  - URL share state encoding

## Project structure

- `app/` Next routes and global styling
- `components/` interactive UI modules and plots
- `lib/math/` DT/CT signal models and convolution engines
- `lib/signals/` signal helpers/parsing
- `lib/serialization/` URL state encoding/decoding
- `content/` explanations and practice content
- `tests/` Vitest tests for DT and CT engines

## Run locally

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Testing

```bash
npm run test
npm run lint
```

## Deploy to Vercel

1. Push repo to GitHub.
2. Import into Vercel.
3. Framework preset: **Next.js**.
4. Build command: `npm run build`, output: default.
5. Deploy.

## Add new DT/CT presets

- DT: update `lib/math/dt.ts` in `dtPresets`.
- CT: update `lib/math/ct.ts` in `ctPresets` and optionally `piecewiseHint`.

## Add new practice problems

Add entries in `content/practice.ts` with id/domain/title/prompt/expected/hints.
