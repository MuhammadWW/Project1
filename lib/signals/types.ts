export type DTSignal = Record<number, number>;

export type CTPrimitiveType = 'step' | 'rect' | 'exp' | 'triangle' | 'piecewise';

export interface CTPrimitive {
  type: CTPrimitiveType;
  amp?: number;
  shift?: number;
  width?: number;
  center?: number;
  decay?: number;
  points?: Array<{ t: number; v: number }>;
}

export interface CTSignal {
  primitives: CTPrimitive[];
  label: string;
}
