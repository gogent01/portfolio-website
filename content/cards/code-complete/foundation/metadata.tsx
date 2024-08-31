import fs from 'fs';
import path from 'path';
import React from 'react';
import { Deck } from '@/types';

const DECK_INFO = React.cache((): Deck => {
  const deckPath = path.join(
    process.cwd(),
    '/content/cards/code-complete/foundation'
  );

  return {
    sectionKey: path.basename(path.dirname(deckPath)),
    key: path.basename(deckPath),
    title: 'Code Construction Foundations',
    description:
      'Key takeaways from the book "Code Complete" by Steve McConnell, part I. What are the prerequisites for building a solid project? Covers problem definition, gathering of requirements, system architecture.',
    cardsPath: deckPath,
    cardKeys: fs
      .readdirSync(deckPath)
      .filter((file) => file.endsWith('.mdx'))
      .map((file) => file.replace(/\.mdx$/, '')),
  };
});

export default DECK_INFO;
