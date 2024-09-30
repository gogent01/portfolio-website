import { notFound } from 'next/navigation';

import SidebarNavigation from '@/components/cards/SidebarNavigation';
import { Text } from '@/components/catalyst/text';
import { Divider } from '@/components/catalyst/divider';
import CardButtons from '@/components/cards/CardButtons';

import { ALL_DECKS } from '@content/cards/metadata';
import { checkCardIds, loadCard } from '@/helpers';
import { CardPageProps } from '@/types';

export async function generateStaticParams(): Promise<
  {
    sectionKey: string;
    deckKey: string;
    cardKey: string;
  }[]
> {
  await checkCardIds();

  return ALL_DECKS.flatMap((deck) =>
    deck.cardKeys.map((cardKey) => ({
      sectionKey: deck.sectionKey,
      deckKey: deck.key,
      cardKey,
    }))
  );
}

export const dynamicParams = false;
export const dynamic = 'error';

export default async function Page(props: CardPageProps) {
  const { sectionKey, deckKey, cardKey } = props.params;
  const card = await loadCard(sectionKey, deckKey, cardKey);

  if (!card) return notFound();

  const deck = ALL_DECKS.find((deck) => deck.key === deckKey)!;

  return (
    <SidebarNavigation deck={deck} card={card}>
      <article className="h-full sm:max-w-screen-sm mx-auto flex flex-col">
        <Text>{card.question}</Text>
        <Divider className="my-4" />

        <CardButtons
          deck={deck}
          card={card}
          currentSide="question"
          className="mt-auto"
        />
      </article>
    </SidebarNavigation>
  );
}
