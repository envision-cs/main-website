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
    const wrapper = mount(LocationCard, { props: defaultProps });
    expect(wrapper.text()).toContain('Tampa Office');
    expect(wrapper.text()).toContain('123 Main St, Tampa, FL');
  });

  it('renders call button with correct link (strips non-digits)', () => {
    const wrapper = mount(LocationCard, { props: defaultProps });
    const callLink = wrapper.find('a[href^="tel:"]');
    expect(callLink.exists()).toBe(true);
    // The component strips non-digits
    expect(callLink.attributes('href')).toBe('tel:5551234567');
  });

  it('renders email button with correct link', () => {
    const wrapper = mount(LocationCard, { props: defaultProps });
    const emailLink = wrapper.find('a[href^="mailto:"]');
    expect(emailLink.exists()).toBe(true);
    expect(emailLink.attributes('href')).toBe('mailto:tampa@example.com');
  });

  it('does not render actions if phone/email are missing', () => {
    const wrapper = mount(LocationCard, {
      props: {
        title: 'Office',
        address: 'Address',
      },
    });
    expect(wrapper.find('a[href^="tel:"]').exists()).toBe(false);
    expect(wrapper.find('a[href^="mailto:"]').exists()).toBe(false);
  });

  it.skip('renders using UCard component', () => {
    const wrapper = mount(LocationCard, { props: defaultProps, global: { stubs: { UCard: true, UIcon: true } } });
    // This should FAIL until we refactor
    expect(wrapper.findComponent({ name: 'UCard' }).exists()).toBe(true);
  });
});
