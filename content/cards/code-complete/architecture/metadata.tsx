import { cache } from 'react';
import { deckInfoFnFactory } from '@/helpers/flashcards';

const DECK_INFO = cache(
  deckInfoFnFactory({
    sectionKey: 'code-complete',
    deckKey: 'architecture',
    title: 'Code Construction Foundations: Architecture',
    description:
      'Key takeaways from the book "Code Complete" by Steve McConnell, part I. What are the prerequisites for building a solid project? Covers topics on a good architecture.',
  })
);

export default DECK_INFO;
