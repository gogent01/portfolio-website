import fs from 'fs';
import path from 'path';
import { Deck } from '@/types';

export function deckInfoFnFactory(options: {
  sectionKey: string;
  deckKey: string;
  title: string;
  description: string;
}): () => Deck {
  const { sectionKey, deckKey, title, description } = options;

  const deckPath = path.join(
    process.cwd(),
    `/content/cards/${sectionKey}/${deckKey}`
  );

  return () => ({
    sectionKey: path.basename(path.dirname(deckPath)),
    key: path.basename(deckPath),
    title,
    description,
    cardsPath: deckPath,
    cardKeys: fs
      .readdirSync(deckPath)
      .filter((filename) => filename.endsWith('.mdx'))
      .sort((a, b) => a.localeCompare(b, 'en', { numeric: true }))
      .map((filename) => removeSortingDigits(filename.replace(/\.mdx$/, ''))),
  });
}

export function removeSortingDigits(str: string) {
  return str.replace(/^\d+-/g, '');
}
