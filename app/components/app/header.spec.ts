import { mount } from '@vue/test-utils';
import { beforeAll, describe, expect, it } from 'vitest';

import Header from './header.vue';

describe('header mobile drawer', () => {
  beforeAll(() => {
    if (!HTMLDialogElement.prototype.showModal) {
      HTMLDialogElement.prototype.showModal = function showModal() {
        this.setAttribute('open', '');
      };
    }

    if (!HTMLDialogElement.prototype.close) {
      HTMLDialogElement.prototype.close = function close() {
        this.removeAttribute('open');
        this.dispatchEvent(new Event('close'));
      };
    }
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

    await wrapper.find('[data-test="mobile-menu-trigger"]').trigger('click');

    const servicesToggle = wrapper.find('[data-test="mobile-services-toggle"]');
    expect(servicesToggle.attributes('aria-expanded')).toBe('false');

    await servicesToggle.trigger('click');
    expect(servicesToggle.attributes('aria-expanded')).toBe('true');

    const panel = wrapper.find('#mobile-services-panel');
    expect(panel.attributes('hidden')).toBeUndefined();

    await servicesToggle.trigger('click');
    expect(servicesToggle.attributes('aria-expanded')).toBe('false');
    expect(panel.attributes('hidden')).toBeDefined();

    wrapper.unmount();
  });

  it('restores focus to menu trigger when dialog closes', async () => {
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

    const closeButton = wrapper.find('[data-test="mobile-menu-close"]');
    await closeButton.trigger('click');

    expect(document.activeElement).toBe(trigger.element);

    wrapper.unmount();
  });
});
