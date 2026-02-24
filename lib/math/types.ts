export type DTSignal = Record<number, number>;

export type PrimitiveKind = 'step' | 'rect' | 'exp' | 'triangle' | 'piecewise';

export interface CTPrimitive {
  kind: PrimitiveKind;
  scale: number;
  shift: number;
  width?: number;
  decay?: number;
  points?: Array<{ t: number; v: number }>;
}

export interface CTSignal {
  primitives: CTPrimitive[];
  label: string;
}

export interface DTConvolutionStep {
  n: number;
  shiftedH: DTSignal;
  product: DTSignal;
  overlap: number[];
  sum: number;
}

export interface CTConvolutionStep {
  t: number;
  overlap: [number, number] | null;
  integral: number;
  errorEstimate: number;
}
