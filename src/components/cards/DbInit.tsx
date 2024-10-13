'use client';

import { useContext, useEffect } from 'react';

import { populateStats } from '@/storage/controllers/cardProgress';
import { CardProgressStorageContext } from '@/providers/CardProgressStorageProvider';

import { CardProgress, Deck } from '@/types';

type DbInitProps = {
  deck: Deck;
};

export default function DbInit(props: DbInitProps) {
  const { deck } = props;
  const { refreshDeckStats } = useContext(CardProgressStorageContext);

  useEffect(() => {
    async function initDeckProgress() {
      const initialData: CardProgress[] = deck.cardKeys.map((cardKey) => ({
        sectionKey: deck.sectionKey,
        deckKey: deck.key,
        cardKey,
        progress: 0,
        dayLastRecalled: 0,
      }));

      await populateStats(initialData);
      refreshDeckStats({ sectionKey: deck.sectionKey, deckKey: deck.key });
    }

    initDeckProgress();
  }, []);

  return null;
}
