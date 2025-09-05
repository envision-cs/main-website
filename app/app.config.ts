export default defineAppConfig({
  ui: {
    colors: {
      primary: 'curious-blue',
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
  uiPro: {
    page: {
      slots: {
        center: 'lg:col-span-8',
      },
    },
    pageBody: {
      base: 'mt-8 pb-24 space-y-24 md:space-y-56',
    },
  },
});
