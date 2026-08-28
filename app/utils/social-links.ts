export interface SocialLink {
  /** Network name, used as a stable key. */
  name: string;
  /** Accessible label for screen readers. */
  label: string;
  href: string;
  /** Outline (not filled) Lucide icon name. */
  icon: string;
}

// Order: LinkedIn, Instagram, Facebook. These are the canonical Envision handles,
// shared by the header social icons and the About Us page.
export const socialLinks: SocialLink[] = [
  {
    name: 'LinkedIn',
    label: 'Envision on LinkedIn',
    href: 'https://www.linkedin.com/company/envision-cs/',
    icon: 'i-lucide-linkedin',
  },
  {
    name: 'Instagram',
    label: 'Envision on Instagram',
    href: 'https://www.instagram.com/envisioncs_/',
    icon: 'i-lucide-instagram',
  },
  {
    name: 'Facebook',
    label: 'Envision on Facebook',
    href: 'https://www.facebook.com/envisioncstampa',
    icon: 'i-lucide-facebook',
  },
];
