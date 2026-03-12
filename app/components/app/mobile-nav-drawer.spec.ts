import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it } from 'vitest';
import { nextTick } from 'vue';

import MobileNavDrawer from './mobile-nav-drawer.vue';

describe('mobileNavDrawer animations', () => {
  function wait(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('opens drawer and applies animated inline styles', async () => {
    const wrapper = mount(MobileNavDrawer, {
      attachTo: document.body,
      global: {
        stubs: {
          NuxtLink: {
            props: ['to'],
            template: '<a :href="to"><slot /></a>',
          },
        },
      },
    });

    await wrapper.find('[data-test="mobile-menu-trigger"]').trigger('click');
    await nextTick();
    await wait(40);

    const drawer = document.body.querySelector('[data-test="mobile-drawer"]') as HTMLElement | null;
    expect(drawer).toBeTruthy();
    expect(drawer?.getAttribute('data-state')).toBe('open');
    expect((drawer?.style.transform || '').length).toBeGreaterThan(0);
  });

  it('closes drawer after slide-out animation completes', async () => {
    const wrapper = mount(MobileNavDrawer, {
      attachTo: document.body,
      global: {
        stubs: {
          NuxtLink: {
            props: ['to'],
            template: '<a :href="to"><slot /></a>',
          },
        },
      },
    });

    await wrapper.find('[data-test="mobile-menu-trigger"]').trigger('click');
    await nextTick();

    const closeButton = document.body.querySelector('[data-test="mobile-menu-close"]') as HTMLButtonElement | null;
    expect(closeButton).toBeTruthy();
    closeButton?.click();
    await wait(450);

    const trigger = wrapper.find('[data-test="mobile-menu-trigger"]');
    expect(trigger.attributes('aria-expanded')).toBe('false');
  });

  it('marks drawer nav items for staggered animation', async () => {
    const wrapper = mount(MobileNavDrawer, {
      attachTo: document.body,
      global: {
        stubs: {
          NuxtLink: {
            props: ['to'],
            template: '<a :href="to"><slot /></a>',
          },
        },
      },
    });

    await wrapper.find('[data-test="mobile-menu-trigger"]').trigger('click');
    await nextTick();

    const staggerTargets = document.body.querySelectorAll('[data-anim="mobile-nav-link"]');
    expect(staggerTargets.length).toBeGreaterThan(0);
  });
});
