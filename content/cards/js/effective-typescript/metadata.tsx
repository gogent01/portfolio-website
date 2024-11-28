import { cache } from 'react';
import { deckInfoFnFactory } from '@/helpers/flashcards';

const DECK_INFO = cache(
  deckInfoFnFactory({
    sectionKey: 'js',
    deckKey: 'effective-typescript',
    title: 'Effective TypeScript: Best Practices',
    description:
      'Key takeaways from the book "Effective TypeScript, 2nd ed." by Dan Vanderkam. Covers 83 practices for using TypeScript\'s type system in the most enjoyable and effective way.',
  })
);

export default DECK_INFO;
