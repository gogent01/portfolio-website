import { ReactNode } from 'react';
import { notFound } from 'next/navigation';

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

export default async function Layout(props: { children: ReactNode }) {
  const { children } = props;

  return <BodyBackground>{children}</BodyBackground>;
}
