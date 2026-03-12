import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import LinkButton from './link-button.vue';

describe('linkButton', () => {
  it('uses primary variant by default', () => {
    const wrapper = mount(LinkButton, {
      props: { to: '/contact' },
      slots: { default: 'Contact' },
      global: {
        stubs: {
          NuxtLink: {
            template: '<a><slot /></a>',
          },
        },
      },
    });

    expect(wrapper.find('.btn').classes()).toContain('btn--primary');
  });

  it('applies secondary variant class and keeps animated overlay', () => {
    const wrapper = mount(LinkButton, {
      props: { to: '/contact', variant: 'secondary' },
      slots: { default: 'Contact' },
      global: {
        stubs: {
          NuxtLink: {
            template: '<a><slot /></a>',
          },
        },
      },
    });

    expect(wrapper.find('.btn').classes()).toContain('btn--secondary');
    expect(wrapper.find('.btn-overlay').exists()).toBe(true);
  });

  it('uses medium size by default', () => {
    const wrapper = mount(LinkButton, {
      props: { to: '/contact' },
      slots: { default: 'Contact' },
      global: {
        stubs: {
          NuxtLink: {
            template: '<a><slot /></a>',
          },
        },
      },
    });

    expect(wrapper.find('.btn-main').classes()).toContain('btn-main--md');
  });

  it('applies small size class when size is sm', () => {
    const wrapper = mount(LinkButton, {
      props: { to: '/contact', size: 'sm' },
      slots: { default: 'Contact' },
      global: {
        stubs: {
          NuxtLink: {
            template: '<a><slot /></a>',
          },
        },
      },
    });

    expect(wrapper.find('.btn-main').classes()).toContain('btn-main--sm');
  });

  it('applies large size class when size is lg', () => {
    const wrapper = mount(LinkButton, {
      props: { to: '/contact', size: 'lg' },
      slots: { default: 'Contact' },
      global: {
        stubs: {
          NuxtLink: {
            template: '<a><slot /></a>',
          },
        },
      },
    });

    expect(wrapper.find('.btn-main').classes()).toContain('btn-main--lg');
  });
});
