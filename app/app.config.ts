import type { NavigationMenuItem } from '@nuxt/ui';

export default defineAppConfig({
  navigationMenuItems: [
    {
      label: 'Services',
      children: [
        {
          label: 'Construction Management',
          to: '/services/construction-management',
          image: 'construction-managment.jpg',
        },
        {
          label: 'Design Build',
          to: '/services/design-build',
          image: 'design-build.jpg',
        },

        {
          label: 'Tenant Improvement',
          to: '/services/tenant-improvement',
          image: 'tenant-improvment.jpg',
        },
        {
          label: 'Enhanced Preconstruction',
          to: '/services/enhanced-preconstruction',
          image: 'enhanced-preconstruction.png',
        },
        {
          label: 'Specialty Projects Division',
          to: '/services/specialty-projects-division',
          image: 'specialty-projects.jpg',
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
      to: '/about',
      // children: [
      //  {
      //    label: 'Who we are',
      //    to: '/about',
      //  },
      //  {
      //    label: 'Our Partners',
      //    to: '/about/partners', // Assuming a sub-page for partners
      //  },
      //  {
      //    label: 'Our Process',
      //    to: '/our-process',
      //  },
      // ],
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
