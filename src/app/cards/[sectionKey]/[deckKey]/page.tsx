import { ALL_DECKS } from '@content/cards/metadata';
import { getRandomElement } from '@/utils';
import { redirect } from 'next/navigation';

export default async function Page(props: {
  params: { sectionKey: string; deckKey: string };
}) {
  const { params } = props;
  const { deckKey } = params;
  const deck = ALL_DECKS.find((deck) => deck.key === deckKey)!;
  const randomCardKey = getRandomElement(deck.cardKeys);

  return redirect(
    `/cards/${deck.sectionKey}/${deck.key}/${randomCardKey}/question`
  );
}
