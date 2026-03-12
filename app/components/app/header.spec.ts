import { mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { nextTick } from 'vue';

import Header from './header.vue';

describe('header navigation', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('uses compact size for the contact link button', () => {
    const wrapper = mount(Header, {
      global: {
        stubs: {
          Icon: true,
          NuxtLink: true,
          AppMobileNavDrawer: {
            template: '<div data-test="mobile-drawer-component" />',
          },
        },
      },
    });

    const cta = wrapper.findComponent({ name: 'LinkButton' });
    expect(cta.exists()).toBe(true);
    expect(cta.props('size')).toBe('sm');
    expect(wrapper.find('.header-cta--mobile-hidden').exists()).toBe(true);
  });

  it('renders the mobile drawer component', () => {
    const wrapper = mount(Header, {
      global: {
        stubs: {
          Icon: true,
          NuxtLink: true,
          AppMobileNavDrawer: {
            template: '<div data-test="mobile-drawer-component" />',
          },
        },
      },
    });

    expect(wrapper.find('[data-test="mobile-drawer-component"]').exists()).toBe(true);
  });

  it('applies the shared inline nav style to all top-level desktop items', () => {
    const wrapper = mount(Header, {
      global: {
        stubs: {
          Icon: true,
          NuxtLink: {
            props: ['to'],
            template: '<a :href="to"><slot /></a>',
          },
          AppMobileNavDrawer: {
            template: '<div data-test="mobile-drawer-component" />',
          },
        },
      },
    });

    expect(wrapper.findAll('.desktop-inline-nav-link')).toHaveLength(4);
    const trigger = wrapper.find('[data-test="desktop-services-trigger"]');
    expect(trigger.classes()).toContain('desktop-inline-nav-link');
    expect(trigger.attributes('aria-expanded')).toBe('false');
  });

  it('opens and closes the desktop fullscreen mega menu', async () => {
    const wrapper = mount(Header, {
      attachTo: document.body,
      global: {
        stubs: {
          Icon: true,
          NuxtLink: true,
          AppMobileNavDrawer: {
            template: '<div data-test="mobile-drawer-component" />',
          },
        },
      },
    });

    expect(wrapper.find('.main-header').classes()).not.toContain('main-header--desktop-open');
    expect(wrapper.find('[data-test="desktop-mega-menu-backdrop"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="desktop-mega-menu-panel"]').exists()).toBe(false);

    const trigger = wrapper.find('[data-test="desktop-services-trigger"]');
    expect(trigger.exists()).toBe(true);

    await trigger.trigger('pointerenter');
    await nextTick();

    expect(wrapper.find('.main-header').classes()).toContain('main-header--desktop-open');
    expect(wrapper.find('[data-test="desktop-mega-menu-backdrop"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="desktop-mega-menu-panel"]').exists()).toBe(true);

    await wrapper.find('[data-test="desktop-mega-menu-backdrop"]').trigger('click');
    await nextTick();

    expect(wrapper.find('.main-header').classes()).not.toContain('main-header--desktop-open');
    expect(wrapper.find('[data-test="desktop-mega-menu-backdrop"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="desktop-mega-menu-panel"]').exists()).toBe(false);

    wrapper.unmount();
  });

  it('renders the Figma service dropdown structure', async () => {
    const wrapper = mount(Header, {
      attachTo: document.body,
      global: {
        stubs: {
          Icon: true,
          NuxtLink: {
            props: ['to'],
            template: '<a :href="to"><slot /></a>',
          },
          AppMobileNavDrawer: {
            template: '<div data-test="mobile-drawer-component" />',
          },
        },
      },
    });

    await wrapper.find('[data-test="desktop-services-trigger"]').trigger('pointerenter');
    await nextTick();

    expect(wrapper.find('[data-test="services-feature-panel"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="services-grid"]').exists()).toBe(true);
    expect(wrapper.findAll('[data-test="services-grid-item"]')).toHaveLength(5);

    wrapper.unmount();
  });
});
