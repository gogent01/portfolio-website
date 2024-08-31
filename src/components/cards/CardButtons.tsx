'use client';

import { useRouter } from 'next/navigation';
import classNames from 'classnames';

import { Button } from '@/components/catalyst/button';
import { Deck, Flashcard } from '@/types';

type CardButtonsProps = {
  deck: Deck;
  card: Flashcard;
  className?: string;
};

export default function CardButtons(props: CardButtonsProps) {
  const { deck, card, className } = props;
  const router = useRouter();

  function handleRemember() {
    const nextCardKey = getRandomCardKey(
      deck.cardKeys.filter((key) => key !== card.key)
    );
    router.push(`/cards/${deck.sectionKey}/${deck.key}/${nextCardKey}`);
  }

  function handleForgot() {
    const nextCardKey = getRandomCardKey(
      deck.cardKeys.filter((key) => key !== card.key)
    );
    router.push(`/cards/${deck.sectionKey}/${deck.key}/${nextCardKey}`);
  }

  function getRandomCardKey(keys: string[]): string {
    return keys[Math.floor(Math.random() * keys.length)];
  }

  return (
    <div
      className={classNames(
        'fixed bottom-0 left-0 right-0 lg:left-[15.5rem] sm:p-4',
        className
      )}
    >
      <div className="max-w-screen-sm mx-auto flex gap-4 p-4 bg-white dark:bg-zinc-900 sm:p-0 lg:bg-transparent lg:dark:bg-transparent">
        <Button className="basis-1/2 !py-3" onClick={handleForgot}>
          Forgot
        </Button>
        <Button className="basis-1/2" onClick={handleRemember}>
          Remember
        </Button>
      </div>
    </div>
  );
}
