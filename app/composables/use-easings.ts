import { cubicBezier } from 'motion-v';

export function useEasings() {
  const { EASINGS } = useAppConfig();

  const entries = Object.entries(EASINGS) as [
    keyof typeof EASINGS,
    [number, number, number, number],
  ][];

  return Object.fromEntries(
    entries.map(([key, value]) => [key, cubicBezier(...value)]),
  ) as {
    [K in keyof typeof EASINGS]: ReturnType<typeof cubicBezier>;
  };
}
