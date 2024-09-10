import { cache } from 'react';
import fs from 'fs';
import path from 'path';
import { Deck } from '@/types';

const DECK_INFO = cache((): Deck => {
  const deckPath = path.join(process.cwd(), '/content/cards/css/typography');

  return {
    sectionKey: path.basename(path.dirname(deckPath)),
    key: path.basename(deckPath),
    title: 'Typography',
    description: 'Learn about typography in CSS.',
    cardsPath: deckPath,
    cardKeys: fs
      .readdirSync(deckPath)
      .filter((file) => file.endsWith('.mdx'))
      .map((file) => file.replace(/\.mdx$/, '')),
  };
});

export default DECK_INFO;
