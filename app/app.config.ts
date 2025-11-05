import type { NavigationMenuItem } from '@nuxt/ui';

export default defineAppConfig({
  navigationMenuItems: [
    {
      label: 'Company',
      children: [
        {
          label: 'Home',
          to: '/',
        },
        {
          label: 'About',
          to: '/about',
        },
        {
          label: 'Life At Envision',
          to: '/life-at-envision',
        },
        {
          label: 'Contact Us',
          to: '/contact',
        },
      ],
    },
    {
      label: 'Services',
      children: [
        {
          label: 'Construction Management',
          to: '/services/construction-management',
        },
        {
          label: 'Design Build',
          to: '/services/design-build',
        },
        {
          label: 'Development and Master Planning',
          to: '/services/development-and-master-planning',
        },
        {
          label: 'Tenant Improvement',
          to: '/services/tenant-improvement',
        },
        {
          label: 'Enhanced Preconstruction',
          to: '/services/enhanced-preconstruction',
        },
        {
          label: 'Specialty Projects Division',
          to: '/services/specialty-projects-division',
        },
      ],
    },
    {
      label: 'Projects',
      to: '/projects/all',
    },
    {
      label: 'Meet the Team',
      to: '/team',
    },
    {
      label: 'About Us',
      children: [
        {
          label: 'Who we are',
          to: '/about',
        },
        {
          label: 'Our Partners',
          to: '/about/partners', // Assuming a sub-page for partners
        },
        {
          label: 'Our Process',
          to: '/our-process',
        },
      ],
    },
    {
      label: 'Connect',
      children: [
        {
          label: 'LinkedIn',
          to: 'https://www.linkedin.com/company/envision-construction-services', // Placeholder
          target: '_blank',
        },
        {
          label: 'Facebook',
          to: 'https://www.facebook.com/envisionconstructionservices', // Placeholder
          target: '_blank',
        },
      ],
    },
  ] as NavigationMenuItem[],
  ui: {
    colors: {
      primary: 'curious-blue',
      secondary: 'envision-green',
      neutral: 'stone',
    },
    page: {
      slots: {
        center: 'lg:col-span-8',
      },
    },
    pageBody: {
      base: 'mt-8 pb-24 space-y-24 md:space-y-56',
    },
    button: {
      slots: {
        base: ['w-fit'],
      },
      variants: {
        size: {
          xl: {
            base: 'px-4 py-2 md:px-6 md:py-3 rounded-full',
          },
        },
      },
    },
    accordion: {
      slots: {
        label: 'text-lg lg:text-xl font-semibold',
      },
    },
  },
});
