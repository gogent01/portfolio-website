import { ReactNode } from 'react';
import { notFound } from 'next/navigation';

import CardProgressStorageProvider from '@/providers/CardProgressStorageProvider';
import { ALL_DECKS } from '@content/cards/metadata';

import DbInit from '@/components/cards/DbInit';
import BodyBackground from '@/components/cards/BodyBackground';

import { loadCard } from '@/helpers';
import { CardPageProps } from '@/types';

export async function generateMetadata(props: CardPageProps): Promise<{
  title: string;
  description: string;
}> {
  const { sectionKey, deckKey, cardKey } = props.params;
  const card = await loadCard(sectionKey, deckKey, cardKey);

  if (!card) return notFound();

  return {
    title: card.title || card.question,
    description: card.question,
  };
}

export default async function Layout(props: {
  params: { sectionKey: string; deckKey: string };
  children: ReactNode;
}) {
  const { params, children } = props;
  const { deckKey } = params;
  const deck = ALL_DECKS.find((deck) => deck.key === deckKey)!;

  return (
    <CardProgressStorageProvider>
      <DbInit deck={deck} />
      <BodyBackground>{children}</BodyBackground>
    </CardProgressStorageProvider>
  );
}
