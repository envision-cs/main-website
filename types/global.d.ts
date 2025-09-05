export type Link = {
  to: string;
  label: string;
  variant?: 'link' | 'solid' | 'outline' | 'soft' | 'subtle' | 'ghost' | undefined;
  color?: 'primary' | 'neutral';
};
