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

export type FunnelStage = 'top' | 'middle' | 'bottom' | 'trade_partner';
export type ConversionRole =
  | 'process_milestone'
  | 'secondary_action'
  | 'macro_conversion'
  | 'macro_conversion_proxy';
export type FunnelMovement = 'entry' | 'down' | 'up' | 'neutral' | 'out' | 'complete';
export type Intent =
  | 'low'
  | 'low-medium'
  | 'medium'
  | 'medium-high'
  | 'high'
  | 'very-high'
  | 'highest';

export type FunnelEvent = {
  funnel_stage: FunnelStage;
  conversion_role: ConversionRole;
  funnel_movement: FunnelMovement;
  intent: Intent;
};

export interface GalleryImage {
  url: string;
  altText: string;
  recommendedFilename: string;
}
