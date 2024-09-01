'use client';

import { useRouter } from 'next/navigation';
import classNames from 'classnames';

import { Button } from '@/components/catalyst/button';
import { Deck, Flashcard } from '@/types';
import { useEffect, useState } from 'react';
import { getRandomElement } from '@/utils';

type CardButtonsProps = {
  deck: Deck;
  card: Flashcard;
  currentSide: 'question' | 'answer';
  className?: string;
};

export default function CardButtons(props: CardButtonsProps) {
  const { deck, card, currentSide, className } = props;
  const router = useRouter();
  const [nextUrl, setNextUrl] = useState<string | null>(null);

  useEffect(() => {
    const getRandomCardKey = getRandomElement<string>;

    if (currentSide === 'question') {
      const answerUrl = `/cards/${deck.sectionKey}/${deck.key}/${card.key}`;
      setNextUrl(answerUrl);
      router.prefetch(answerUrl);
    } else if (currentSide === 'answer') {
      const nextCardKey = getRandomCardKey(
        deck.cardKeys.filter((key) => key !== card.key)
      );
      const questionUrl = `/cards/${deck.sectionKey}/${deck.key}/${nextCardKey}/question`;
      setNextUrl(questionUrl);
      router.prefetch(questionUrl);
    }
  }, []);

  function handleReveal() {
    if (nextUrl) router.push(nextUrl);
  }

  function handleRemember() {
    if (nextUrl) router.push(nextUrl);
  }

  function handleForgot() {
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
