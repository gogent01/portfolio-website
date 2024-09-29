import { cache } from 'react';
import { deckInfoFnFactory } from '@/helpers/flashcards';

const DECK_INFO = cache(
  deckInfoFnFactory({
    sectionKey: 'css',
    deckKey: 'typography',
    title: 'Typography',
    description: 'Learn about advanced typography features in CSS.',
  })
);

export default DECK_INFO;
