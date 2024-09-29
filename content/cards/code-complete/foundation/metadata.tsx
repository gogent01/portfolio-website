import { cache } from 'react';
import { deckInfoFnFactory } from '@/helpers/flashcards';

const DECK_INFO = cache(
  deckInfoFnFactory({
    sectionKey: 'code-complete',
    deckKey: 'foundation',
    title: 'Code Construction Foundations: Problem Definition & Requirements',
    description:
      'Key takeaways from the book "Code Complete" by Steve McConnell, part I. What are the prerequisites for building a solid project? Covers problem definition and gathering of requirements.',
  })
);

export default DECK_INFO;
