export const dtSteps = [
  {
    title: 'Step 1: Rename the variable to k',
    formula: 'x[k], h[k]',
    description: 'We use k as the running index so n stays reserved for the output location.',
    mistake: 'Common mistake: using n as both summation variable and output index.',
  },
  {
    title: 'Step 2: Flip h[k]',
    formula: 'h[-k]',
    description: 'Mirror h about the vertical axis.',
    mistake: 'Common mistake: flipping x instead of h.',
  },
  {
    title: 'Step 3: Shift by n',
    formula: 'h[n-k]',
    description: 'Slide the flipped signal so we can inspect overlap at each n.',
    mistake: 'Common mistake: using h[k-n] and reversing the shift direction.',
  },
  {
    title: 'Step 4: Multiply pointwise',
    formula: 'w_n[k] = x[k]h[n-k]',
    description: 'Only overlapping samples contribute.',
    mistake: 'Common mistake: multiplying wrong index pairs.',
  },
  {
    title: 'Step 5: Sum over k',
    formula: 'y[n]=Σ_k w_n[k]',
    description: 'Add all product stems to get one output sample.',
    mistake: 'Common mistake: forgetting to include all overlap indices.',
  },
];

export const ctSteps = [
  '1) Rewrite as x(τ), h(τ).',
  '2) Flip h(τ) → h(-τ).',
  '3) Shift to h(t-τ).',
  '4) Multiply: w_t(τ)=x(τ)h(t-τ).',
  '5) Integrate: y(t)=∫w_t(τ)dτ.',
];

export const glossary = [
  ['δ (delta)', 'Unit impulse: identity element of convolution.'],
  ['u (step)', 'Heaviside step: turns on at zero.'],
  ['rect', 'Rectangle pulse, finite-width support.'],
  ['support', 'Region where signal is nonzero.'],
  ['impulse response', 'Output when input is δ; full LTI characterization.'],
];
