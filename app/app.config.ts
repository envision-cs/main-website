import type { NavigationMenuItem } from '@nuxt/ui';

export default defineAppConfig({
  navigationMenuItems: [
    {
      label: 'Services',
      children: [
        {
          label: 'Construction Management',
          to: '/services/construction-management',
          image: 'https://ik.imagekit.io/pnixsw7lg/main-website/2K6A2696.jpg',
        },
        {
          label: 'Design Build',
          to: '/services/design-build',
          image: 'https://ik.imagekit.io/pnixsw7lg/main-website/IMG_3125.jpg',
        },

        {
          label: 'Tenant Improvement',
          to: '/services/tenant-improvement',
          image: 'https://ik.imagekit.io/pnixsw7lg/main-website/2019%20Fall%20Stakeholders%20Presentation_Draft%20email.jpg',
        },
        {
          label: 'Enhanced Preconstruction',
          to: '/services/enhanced-preconstruction',
          image: 'https://ik.imagekit.io/pnixsw7lg/main-website/IMG_4100%20(2).jpg',
        },
        {
          label: 'Specialty Projects Division',
          to: '/services/specialty-projects-division',
          image: 'https://ik.imagekit.io/pnixsw7lg/main-website/IMG_0231.jpg',
        },
        {
          label: 'Development and Master Planning',
          to: '/services/development-and-master-planning',
        },
      ],
    },
    {
      label: 'Projects',
      to: '/projects',
    },
    {
      label: 'Meet the Team',
      to: '/team',
    },
    {
      label: 'About Us',
      to: '/about',
    },

  ] as NavigationMenuItem[],
  ui: {
    colors: {
      primary: 'curious-blue',
      secondary: 'envision-green',
      neutral: 'slate',
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
        base: [
          'w-fit relative isolate overflow-hidden rounded-none',
          '[--btn-outline:var(--ui-color-neutral-900)] [--btn-text:var(--ui-color-neutral-900)] [--btn-hover-text:white]',
          'before:pointer-events-none before:absolute before:inset-x-0 before:bottom-0 before:z-0 before:h-full before:origin-bottom before:scale-y-0',
          'before:rounded-none before:bg-[var(--ui-primary)] before:content-[""]',
          'before:transition-transform before:duration-300 before:ease-out',
          'hover:before:scale-y-100 disabled:hover:before:scale-y-0 hover:text-[var(--btn-hover-text)]',
        ],
        label: 'relative z-10',
        leadingIcon: 'relative z-10',
        trailingIcon: 'relative z-10',
        leadingAvatar: 'relative z-10',
      },
      variants: {
        variant: {
          outline: '!ring-2 !ring-inset !ring-[var(--btn-outline)] !bg-transparent !text-[var(--btn-text)] focus-visible:!ring-[var(--btn-outline)]',
          ghost: '!ring-2 !ring-inset !ring-[var(--btn-outline)] !bg-transparent !text-[var(--btn-text)] focus-visible:!ring-[var(--btn-outline)]',
        },
        size: {
          xl: {
            base: 'px-4 py-2 md:px-6 md:py-3 rounded-none',
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
  teamColors: [
    {
      name: 'Green Team',
      role: 'Leadership',
      description: 'The Green Team is responsable tor Collaborating wirh each team in the company to ensure the best results are implemented within the company\'s operations',
      teamColor: '#5AB847',
    },
    {
      name: 'C.O.L Team',
      role: 'BD | Marketing',
      description: 'The C.O.L Team’s goal is to promote the growth of Envision, inwardly and outwardly by implementing branding and business development efforts.',
      teamColor: '#BAE11F',
    },
    {
      name: 'Orange Team',
      role: 'Pre Construction',
      description: 'The Orange Team helps to ensure efficiency when completing pre-construction related duties such as processing |TB\'s generating estimates and more',
      teamColor: '#FFAE00',
    },
    {
      name: 'Blue Team',
      role: 'Operations',
      description: 'The Blue Team collaborates to assume the overall finacial stability of Envision as well as to oversee all company operations that are executed the teams.',
      teamColor: '#1D93D1',
    },
    {
      name: 'Red Team',
      role: 'Field Team',
      description: 'The Read Team field supervisors collaborate to ensure the est delivery of schedule and quality of work is maintained and uncompromised on all Envision projects.',
      teamColor: '#DF3E3E',
    },
    {
      name: 'Gray Team',
      role: 'Project',
      description: 'The Gray Team is responsable for the successeful execution of all projects from start to completion This includes project planning site logistics and material order and tracking.',
      teamColor: '#D9D9D9',
    },
  ],
  EASINGS: {
    cinematic: [0.645, 0.045, 0.355, 1],
    snappy: [0.165, 0.84, 0.44, 1],
    gentle: [0.37, 0, 0.63, 1],
    expressive: [0.34, 1.56, 0.64, 1],
    fast: [0.19, 1, 0.22, 1],
    base: [0.25, 0.46, 0.45, 0.94],
  },
});
