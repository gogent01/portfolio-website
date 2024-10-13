'use client';

import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import classNames from 'classnames';

import { CardProgressStorageContext } from '@/providers/CardProgressStorageProvider';

import { Button } from '@/components/catalyst/button';

import { getRandomElement } from '@/utils';
import { Deck, Flashcard } from '@/types';
import { addStat, getNextCardKey } from '@/storage/controllers/cardProgress';

type CardButtonsProps = {
  deck: Deck;
  card: Flashcard;
  currentSide: 'question' | 'answer';
  className?: string;
};

export default function CardButtons(props: CardButtonsProps) {
  const { deck, card, currentSide, className } = props;
  const { setCurrentCardKey, refreshDeckStats } = useContext(
    CardProgressStorageContext
  );
  const router = useRouter();

  const [nextUrl, setNextUrl] = useState<string | null>(null);

  useEffect(() => {
    refreshDeckStats({
      sectionKey: deck.sectionKey,
      deckKey: deck.key,
    });
  }, [deck.sectionKey, deck.key]);

  useEffect(() => {
    setCurrentCardKey(card.key);
  }, [card.key]);

  useEffect(() => {
    async function prepareNextCard() {
      const nextCardKey = await getNextCardKey(
        {
          sectionKey: deck.sectionKey,
          deckKey: deck.key,
          cardKey: card.key,
        },
        () => {
          const availableCardKeys = deck.cardKeys.filter(
            (key) => key !== card.id
          );
          return getRandomElement(availableCardKeys);
        }
      );

      const nextCardUrl = `/cards/${deck.sectionKey}/${deck.key}/${nextCardKey}/question`;
      setNextUrl(nextCardUrl);
      router.prefetch(nextCardUrl);
    }

    if (currentSide === 'question') {
      const answerUrl = `/cards/${deck.sectionKey}/${deck.key}/${card.key}`;
      setNextUrl(answerUrl);
      router.prefetch(answerUrl);
    } else if (currentSide === 'answer') {
      prepareNextCard();
    }
  }, []);

  function handleReveal() {
    if (nextUrl) router.push(nextUrl);
  }

  async function handleRemember() {
    await addStat(
      {
        sectionKey: deck.sectionKey,
        deckKey: deck.key,
        cardKey: card.key,
      },
      'recalled'
    );
    if (nextUrl) router.push(nextUrl);
  }

  async function handleForgot() {
    await addStat(
      {
        sectionKey: deck.sectionKey,
        deckKey: deck.key,
        cardKey: card.key,
      },
      'forgot'
    );
    if (nextUrl) router.push(nextUrl);
  }

  return (
    <div
      className={classNames(
        'fixed bottom-0 left-0 right-0 lg:left-[15.5rem] sm:p-4',
        className
      )}
    >
      <div className="max-w-screen-sm mx-auto flex gap-4 p-4 bg-white dark:bg-zinc-900 sm:p-0 lg:bg-transparent lg:dark:bg-transparent">
        {currentSide === 'question' && (
          <>
            <Button className="basis-full !py-3" onClick={handleReveal}>
              Show the answer
            </Button>
          </>
        )}

        {currentSide === 'answer' && (
          <>
            <Button className="basis-1/2 !py-3" onClick={handleForgot}>
              Forgot
            </Button>
            <Button className="basis-1/2" onClick={handleRemember}>
              Remember
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
