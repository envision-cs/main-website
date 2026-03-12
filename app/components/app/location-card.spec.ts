import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import LocationCard from './location-card.vue';

describe('locationCard', () => {
  const defaultProps = {
    title: 'Tampa Office',
    address: '123 Main St, Tampa, FL',
    phone: '555-123-4567',
    email: 'tampa@example.com',
  };

  it('renders title and address', () => {
    const wrapper = mount(LocationCard, {
      props: defaultProps,
      global: {
        stubs: {
          AppButton: true,
        },
      },
    });
    expect(wrapper.text()).toContain('Tampa Office');
    expect(wrapper.text()).toContain('123 Main St, Tampa, FL');
  });

  it('renders call button with correct link (strips non-digits)', () => {
    const wrapper = mount(LocationCard, {
      props: defaultProps,
      global: {
        stubs: {
          AppButton: true,
        },
      },
    });
    const buttons = wrapper.findAllComponents({ name: 'AppButton' });
    const callLink = buttons.find(b => b.attributes('icon') === 'i-lucide-phone-call');

    expect(callLink).toBeDefined();
    expect(callLink?.attributes('to')).toBe('tel:5551234567');
  });

  it('renders email button with correct link', () => {
    const wrapper = mount(LocationCard, {
      props: defaultProps,
      global: {
        stubs: {
          AppButton: true,
        },
      },
    });
    const buttons = wrapper.findAllComponents({ name: 'AppButton' });
    const emailLink = buttons.find(b => b.attributes('icon') === 'i-lucide-mail');

    expect(emailLink).toBeDefined();
    expect(emailLink?.attributes('to')).toBe('mailto:tampa@example.com');
  });

  it('does not render actions if phone/email are missing', () => {
    const wrapper = mount(LocationCard, {
      props: {
        title: 'Office',
        address: 'Address',
      },
      global: {
        stubs: {
          AppButton: true,
        },
      },
    });
    expect(wrapper.findAllComponents({ name: 'AppButton' }).length).toBe(0);
  });

  it('renders using proper HTML structure (article)', () => {
    const wrapper = mount(LocationCard, { props: defaultProps, global: { stubs: { AppButton: true } } });
    expect(wrapper.find('article.location-card').exists()).toBe(true);
  });
});
