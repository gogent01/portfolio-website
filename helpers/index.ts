import React from 'react';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { Flashcard, Project } from '@/types';
import { ALL_DECKS } from '@/content/cards/metadata';

export const loadProject = React.cache(async function loadBlogPost(
  slug: string
): Promise<{ data: Project; content: string } | never> {
  const rawContent = await fs
    .readFile(path.join(process.cwd(), `/content/projects/${slug}.mdx`), 'utf8')
    .catch(() => {
      throw new Error('content_not_found');
    });

  const { data, content } = matter(rawContent) as unknown as {
    data: Project;
    content: string;
  };

  return { data, content };
});

export async function checkCardIds() {
  const usedCardIds = new Set<string>();
  const duplicateIdErrors: string[] = [];

  for (const deck of ALL_DECKS) {
    for (const cardKey of deck.cardKeys) {
      const card = await loadCard(deck.sectionKey, deck.key, cardKey);
      if (usedCardIds.has(card.id)) {
        duplicateIdErrors.push(
          `Duplicate card ID (${card.id}) in deck "${deck.title}", card path: ${deck.sectionKey}/${deck.key}/${cardKey}`
        );
      }
      usedCardIds.add(card.id);
    }
  }

  if (duplicateIdErrors.length > 0) {
    throw new Error(duplicateIdErrors.join('\n'));
  }
}

export const loadCard = React.cache(async function (
  sectionKey: string,
  deckKey: string,
  cardKey: string
): Promise<Flashcard> {
  const rawContent = await fs
    .readFile(
      path.join(
        process.cwd(),
        `/content/cards/${sectionKey}/${deckKey}/${cardKey}.mdx`
      ),
      'utf8'
    )
    .catch(() => {
      throw new Error('content_not_found');
    });

  const { data, content } = matter(rawContent) as unknown as {
    data: Omit<Flashcard, 'content'>;
    content: string;
  };

  return { ...data, answer: content };
});
