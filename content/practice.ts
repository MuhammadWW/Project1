export interface PracticeProblem {
  id: string;
  domain: 'DT' | 'CT';
  title: string;
  prompt: string;
  expected: string;
  hints: string[];
}

export const practiceProblems: PracticeProblem[] = [
  { id: 'dt1', domain: 'DT', title: 'Short finite sequences', prompt: 'x={1 at n=0,1}; h={1 at n=0,1}.', expected: 'y={1,2,1}', hints: ['Flip h first.', 'Check overlap for n=0..2.'] },
  { id: 'dt2', domain: 'DT', title: 'Deltas with FIR', prompt: 'x=δ[n]+2δ[n-1], h=δ[n]+δ[n-1]+δ[n-2].', expected: 'y={1,3,3,2}', hints: ['Use shift-sum shortcut with deltas.'] },
  { id: 'dt3', domain: 'DT', title: 'Truncated step', prompt: 'x=u[n]-u[n-4], h=u[n]-u[n-3].', expected: 'triangle-like sequence length 6', hints: ['Support length is Lx+Lh-1.'] },
  { id: 'dt4', domain: 'DT', title: 'Echo check', prompt: 'h=δ[n]+0.5δ[n-1], compute y for pulse x.', expected: 'input plus delayed scaled copy', hints: ['Interpret physically as two paths.'] },
  { id: 'ct1', domain: 'CT', title: 'u(t+a) * e^{-t}u(t)', prompt: 'Find overlap bounds and intervals.', expected: '(1-e^{-a-t})u(t+a)', hints: ['No overlap before -a.'] },
  { id: 'ct2', domain: 'CT', title: 'rect * rect', prompt: 'Convolve two unit-width rectangles.', expected: 'triangle pulse', hints: ['Integral equals overlap length.'] },
  { id: 'ct3', domain: 'CT', title: 'exp * shifted rect', prompt: 'e^{-t}u(t) * rect(t-1/2).', expected: '3-piece answer by t intervals', hints: ['Split t<0, 0≤t<1, t≥1.'] },
  { id: 'ct4', domain: 'CT', title: 'step * exp', prompt: 'u(t)*e^{-t}u(t)', expected: '(1-e^{-t})u(t)', hints: ['Integrate exp from 0 to t.'] },
];
