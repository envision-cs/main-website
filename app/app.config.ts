import type { NavigationMenuItem } from '@nuxt/ui';

export default defineAppConfig({
  navigationMenuItems: [
    {
      label: 'About',
      to: '#',
      children: [
        {
          label: 'Who we are',
          description:
            'We provide construction management services to meet your needs.',
        },
        {
          label: 'Our Partners',
          description:
            'We provide construction management services to meet your needs.',
        },
        {
          label: 'Our Process',
          description:
            'We provide construction management services to meet your needs.',
        },
      ],
    },
    {
      label: 'Services',
      to: '#',
      children: [
        {
          label: 'Construction Management',
          description:
            'We provide construction management services to meet your needs.',
        },
        {
          label: 'Design Build',
          description:
            'We provide construction management services to meet your needs.',
        },
        {
          label: 'Development and Master Planning',
          description:
            'We provide construction management services to meet your needs.',
        },
        {
          label: 'Tenant Improvement',

          description:
            'We provide construction management services to meet your needs.',
        },
        {
          label: 'Enhanced Preconstruction',
          description:
            'We provide construction management services to meet your needs.',
        },
        {
          label: 'Specialty Projects Division',
          description:
            'We provide construction management services to meet your needs.',
        },
      ],
    },
    {
      label: 'Projects',
      to: '/projects/',
    },
    {
      label: 'Life At Envision',
      to: '#',
    },
    {
      label: 'Meet the Team',
      to: '#',
    },
    {
      label: 'Contact Us',
      to: '/contact',
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
