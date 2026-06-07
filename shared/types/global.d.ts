export type Link = {
  to: string;
  label: string;
  variant?: 'link' | 'solid' | 'outline' | 'soft' | 'subtle' | 'ghost' | undefined;
  color?: 'primary' | 'neutral';
};

export type Item = {
  id: number;
  label: string;
  description?: string;
  items?: string[];
};
