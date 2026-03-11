import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { nextTick } from 'vue';

import Header from './header.vue';

describe('header mobile drawer', () => {
  it('uses compact size for the contact link button', () => {
    const wrapper = mount(Header, {
      global: {
        stubs: {
          Icon: true,
          NuxtLink: true,
          NavDropdown: true,
        },
      },
    });

    const cta = wrapper.findComponent({ name: 'LinkButton' });
    expect(cta.exists()).toBe(true);
    expect(cta.props('size')).toBe('sm');
  });

  it('exposes mobile menu trigger semantics', () => {
    const wrapper = mount(Header, {
      global: {
        stubs: {
          Icon: true,
          NuxtLink: true,
          NavDropdown: true,
        },
      },
    });

    const trigger = wrapper.find('[data-test="mobile-menu-trigger"]');
    expect(trigger.exists()).toBe(true);
    expect(trigger.attributes('aria-haspopup')).toBe('dialog');
    expect(trigger.attributes('aria-expanded')).toBe('false');
  });

  it('toggles services disclosure aria-expanded and controlled region state', async () => {
    const wrapper = mount(Header, {
      attachTo: document.body,
      global: {
        stubs: {
          Icon: true,
          NuxtLink: true,
          NavDropdown: true,
        },
      },
    });

    const trigger = wrapper.find('[data-test="mobile-menu-trigger"]');
    await trigger.trigger('click');
    await nextTick();

    const servicesToggle = document.body.querySelector('[data-test="mobile-services-toggle"]') as HTMLButtonElement | null;
    expect(servicesToggle).toBeTruthy();
    expect(servicesToggle?.getAttribute('aria-expanded')).toBe('false');

    servicesToggle?.click();
    await nextTick();
    expect(servicesToggle?.getAttribute('aria-expanded')).toBe('true');
    expect(document.body.querySelector('[data-test="mobile-services-panel"]')).toBeTruthy();

    servicesToggle?.click();
    await nextTick();
    expect(servicesToggle?.getAttribute('aria-expanded')).toBe('false');
    expect(document.body.querySelector('[data-test="mobile-services-panel"]')).toBeTruthy();

    wrapper.unmount();
  });

  it('closes dialog and updates trigger expanded state', async () => {
    const wrapper = mount(Header, {
      attachTo: document.body,
      global: {
        stubs: {
          Icon: true,
          NuxtLink: true,
          NavDropdown: true,
        },
      },
    });

    const trigger = wrapper.find('[data-test="mobile-menu-trigger"]');
    await trigger.trigger('click');
    await nextTick();

    const closeButton = document.body.querySelector('[data-test="mobile-menu-close"]') as HTMLButtonElement | null;
    expect(closeButton).toBeTruthy();
    closeButton?.click();
    await nextTick();

    expect(trigger.attributes('aria-expanded')).toBe('false');
    const drawer = document.body.querySelector('[data-test="mobile-drawer"]');
    expect(drawer?.getAttribute('data-state')).toBe('closed');

    wrapper.unmount();
  });
});
