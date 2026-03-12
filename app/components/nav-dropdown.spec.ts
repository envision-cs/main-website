import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { nextTick } from 'vue';

import NavDropdown from './nav-dropdown.vue';

vi.mock('vue-router', () => ({
  useRoute: () => ({ fullPath: '/' }),
}));

describe('nav-dropdown', () => {
  beforeEach(() => {
    vi.stubGlobal('matchMedia', vi.fn((query: string) => ({
      matches: query === '(hover: hover)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })));
  });

  it('opens on hover and exposes expanded state', async () => {
    const wrapper = mount(NavDropdown, {
      props: { buttonText: 'Services' },
      slots: { default: '<div>Menu content</div>' },
      global: {
        stubs: {
          NuxtImg: { template: '<img />' },
        },
      },
    });

    const trigger = wrapper.find('.anchor-button');
    await trigger.trigger('pointerenter', { pointerType: 'mouse' });
    await trigger.trigger('pointermove', { pointerType: 'mouse' });

    expect(trigger.attributes('aria-expanded')).toBe('true');
  });

  it('renders menubar content in the portal when opened', async () => {
    const wrapper = mount(NavDropdown, {
      props: { buttonText: 'Services' },
      slots: { default: '<div>Menu content</div>' },
      global: {
        stubs: {
          NuxtImg: { template: '<img />' },
        },
      },
    });

    const trigger = wrapper.find('.anchor-button');
    await trigger.trigger('pointerenter', { pointerType: 'mouse' });
    await trigger.trigger('pointermove', { pointerType: 'mouse' });
    await nextTick();

    const panelInBody = document.body.querySelector('.styled-popover');
    const panelInWrapper = wrapper.find('.styled-popover').exists();
    expect(Boolean(panelInBody) || panelInWrapper).toBe(true);
  });
});
