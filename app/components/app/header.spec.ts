import { mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { nextTick } from 'vue';

import Header from './header.vue';

describe('header mobile drawer', () => {
  function wait(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

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
          NavDropdown: true,
        },
      },
    });

    const cta = wrapper.findComponent({ name: 'LinkButton' });
    expect(cta.exists()).toBe(true);
    expect(cta.props('size')).toBe('sm');
    expect(cta.classes()).toContain('header-cta--mobile-hidden');
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
    expect(trigger.classes()).toContain('mobile-trigger');
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

    const closeButton = Array.from(document.body.querySelectorAll('[data-test="mobile-menu-close"]')).at(-1) as HTMLButtonElement | undefined;
    expect(closeButton).toBeTruthy();
    closeButton?.click();
    await wait(450);
    await nextTick();

    expect(trigger.attributes('aria-expanded')).toBe('false');
    const drawer = document.body.querySelector('[data-test="mobile-drawer"]');
    expect(drawer === null || drawer.getAttribute('data-state') === 'closed').toBe(true);

    wrapper.unmount();
  });
});
