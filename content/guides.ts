export const dtSteps = [
  { title: 'Step 1: Rename variable', formula: 'x[k], h[k]', note: 'Use k as the summation variable so n stays fixed.', mistake: 'Using n inside the summation.' },
  { title: 'Step 2: Flip', formula: 'h[-k]', note: 'Reflect h[k] about the vertical axis.', mistake: 'Flipping x instead of h.' },
  { title: 'Step 3: Shift', formula: 'h[n-k]', note: 'Shift the flipped signal by n.', mistake: 'Confusing h[k-n] with h[n-k].' },
  { title: 'Step 4: Multiply', formula: 'w_n[k]=x[k]h[n-k]', note: 'Pointwise multiply over k.', mistake: 'Multiplying mismatched indices.' },
  { title: 'Step 5: Add', formula: 'y[n]=Σ_k w_n[k]', note: 'Sum only overlap terms.', mistake: 'Summing outside overlap support.' }
];

export const ctSteps = [
  { title: 'Step 1: Rename variable', formula: 'x(τ), h(τ)', note: 'Use τ for integration.', mistake: 'Mixing t and τ.' },
  { title: 'Step 2: Flip', formula: 'h(-τ)', note: 'Reflect about τ=0.', mistake: 'No time reversal.' },
  { title: 'Step 3: Shift', formula: 'h(t-τ)', note: 'Shift by output time t.', mistake: 'Wrong shift direction sign.' },
  { title: 'Step 4: Multiply', formula: 'w_t(τ)=x(τ)h(t-τ)', note: 'Overlap region drives result.', mistake: 'Ignoring u(t) gating.' },
  { title: 'Step 5: Integrate', formula: 'y(t)=∫w_t(τ)dτ', note: 'Integrate only where overlap exists.', mistake: 'Wrong integration limits.' }
];

export const practiceProblems = [
  { id: 'dt1', mode: 'DT', prompt: 'Convolve x={0:1,1:2} with h={0:1,1:1}.' },
  { id: 'dt2', mode: 'DT', prompt: 'x=δ[n]+2δ[n-2], h={0:1,1:-1,2:1}.' },
  { id: 'dt3', mode: 'DT', prompt: 'x=truncated u[n], h={0:1,1:1,2:1}.' },
  { id: 'dt4', mode: 'DT', prompt: 'x={-1:1,0:1}, h={0:1,1:2,2:1}.' },
  { id: 'ct1', mode: 'CT', prompt: 'u(t+2) * e^{-t}u(t).' },
  { id: 'ct2', mode: 'CT', prompt: 'rect(t) * rect(t).' },
  { id: 'ct3', mode: 'CT', prompt: 'e^{-t}u(t) * rect(t-1/2).' },
  { id: 'ct4', mode: 'CT', prompt: 'triangle(t) * rect(t).' }
];
