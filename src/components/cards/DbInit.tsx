'use client';

import { useContext, useEffect } from 'react';

import {
  dropRemovedCardStats,
  populateCardStats,
} from '@/storage/controllers/cardProgress';
import { CardProgressStorageContext } from '@/providers/CardProgressStorageProvider';

import { Deck } from '@/types';

type DbInitProps = {
  deck: Deck;
};

export default function DbInit(props: DbInitProps) {
  const { deck } = props;
  const { loadDeckStats } = useContext(CardProgressStorageContext);

  useEffect(() => {
    // This function is required to ask the browser to persist the storage.
    // Otherwise, the storage will be cleared after 7 days on Safari,
    // or whenever disk memory is low.
    // The browser should display a prompt to the user to ask for permission.
    async function persistStorage() {
      const storageManager = navigator.storage;
      const persisted = await storageManager.persisted();

      // temporary log to see if storage is persisted
      console.log('persisted: ', persisted);

      if (persisted) return;

      await storageManager.persist();
    }

    persistStorage();
  }, []);

  useEffect(() => {
    async function initDeckProgress() {
      await populateCardStats(deck);
      await dropRemovedCardStats(deck);
      loadDeckStats({ sectionKey: deck.sectionKey, deckKey: deck.key });
    }

    initDeckProgress();
  }, []);

  return null;
}
