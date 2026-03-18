import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import CardGroupA from './card-group-a.vue';

describe('card-group-a', () => {
  const cards = Array.from({ length: 4 }, (_, index) => ({
    title: `Project ${index + 1}`,
    link: `/projects/${index + 1}`,
    image: `https://example.com/${index + 1}.jpg`,
    sector: 'Education',
    completed: '2025',
  }));

  it('renders only the first three cards', () => {
    const wrapper = mount(CardGroupA, {
      props: {
        cards,
      },
      global: {
        stubs: {
          AppRevealCard: {
            props: ['image', 'title', 'to'],
            template: '<article class="reveal-card">{{ title }}</article>',
          },
          AppTypography: {
            template: '<div><slot /></div>',
          },
          UIcon: true,
        },
      },
    });

    const renderedCards = wrapper.findAll('.reveal-card');

    expect(renderedCards).toHaveLength(3);
    expect(renderedCards.map(card => card.text())).toEqual([
      'Project 1',
      'Project 2',
      'Project 3',
    ]);
  });
});
