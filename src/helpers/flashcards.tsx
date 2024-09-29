import { Deck } from '@/types';
import path from 'path';
import fs from 'fs';

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
      .filter((file) => file.endsWith('.mdx'))
      .map((file) => file.replace(/\.mdx$/, '')),
  });
}
