'use client';

import { useContext, useEffect } from 'react';
import { CardProgressStorageContext } from '@/providers/CardProgressStorageProvider';
import { CardProgress, Deck } from '@/types';

type DbInitProps = {
  deck: Deck;
};

export default function DbInit(props: DbInitProps) {
  const { deck } = props;
  const { init } = useContext(CardProgressStorageContext);

  useEffect(() => {
    const initialData: CardProgress[] = deck.cardKeys.map((cardKey) => ({
      sectionKey: deck.sectionKey,
      deckKey: deck.key,
      cardKey,
      progress: 0,
    }));

    init(initialData);
  }, []);

  return null;
}
