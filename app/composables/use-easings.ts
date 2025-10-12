import { cubicBezier } from 'motion-v';

export function useEasings() {
  const cinematic = cubicBezier(0.645, 0.045, 0.355, 1); // easeInOutCubic
  const snappy = cubicBezier(0.165, 0.84, 0.44, 1); // easeOutQuart
  const gentle = cubicBezier(0.37, 0, 0.63, 1); // easeInOutSine
  const expressive = cubicBezier(0.34, 1.56, 0.64, 1); // easeOutBack
  const fast = cubicBezier(0.19, 1, 0.22, 1); // easeOutExpo

  return {
    cinematic,
    snappy,
    gentle,
    expressive,
    fast,
  };
}
