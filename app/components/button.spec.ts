import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import Button from './button.vue';

describe('button', () => {
  it('uses primary variant by default', () => {
    const wrapper = mount(Button, {
      slots: { default: 'Contact' },
    });

    expect(wrapper.find('.btn').classes()).toContain('btn--primary');
  });

  it('uses medium size by default', () => {
    const wrapper = mount(Button, {
      slots: { default: 'Contact' },
    });

    expect(wrapper.find('.btn-main').classes()).toContain('btn-main--md');
  });

  it('uses button as the default type', () => {
    const wrapper = mount(Button, {
      slots: { default: 'Contact' },
    });

    expect(wrapper.find('button').attributes('type')).toBe('button');
  });

  it('applies secondary variant class and keeps animated overlay', () => {
    const wrapper = mount(Button, {
      props: { variant: 'secondary' },
      slots: { default: 'Contact' },
    });

    expect(wrapper.find('.btn').classes()).toContain('btn--secondary');
    expect(wrapper.find('.btn-overlay').exists()).toBe(true);
  });

  it('applies small size class when size is sm', () => {
    const wrapper = mount(Button, {
      props: { size: 'sm' },
      slots: { default: 'Contact' },
    });

    expect(wrapper.find('.btn-main').classes()).toContain('btn-main--sm');
  });

  it('applies large size class when size is lg', () => {
    const wrapper = mount(Button, {
      props: { size: 'lg' },
      slots: { default: 'Contact' },
    });

    expect(wrapper.find('.btn-main').classes()).toContain('btn-main--lg');
  });

  it('forwards disabled attribute to native button', () => {
    const wrapper = mount(Button, {
      props: { disabled: true },
      slots: { default: 'Contact' },
    });

    expect(wrapper.find('button').attributes('disabled')).toBeDefined();
  });
});
