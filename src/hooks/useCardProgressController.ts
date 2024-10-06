'use client';

import { useCardProgressStorage } from '@/hooks/useCardProgressStorage';
import { MAX_CARD_PROGRESS } from '@/config/variables';

import { getRandomElement } from '@/utils';
import { CardPath, CardProgress, CardProgressRange } from '@/types';

export function useCardProgressController() {
  const { populate, getTransaction, createOrUpdate, getByPath, getAll } =
    useCardProgressStorage();

  async function init(initialData: CardProgress[]) {
    await populate(initialData);
  }

  async function addStat(cardPath: CardPath, outcome: 'recalled' | 'forgot') {
    const t = await getTransaction();

    const cardProgress = await getByPath(cardPath, t);
    if (!cardProgress) return;

    if (outcome === 'forgot') {
      cardProgress.progress = 0;
    } else {
      cardProgress.progress = Math.min(
        cardProgress.progress + 1,
        MAX_CARD_PROGRESS
      ) as CardProgressRange;
    }

    await createOrUpdate(cardProgress, t);
  }

  async function getNextCardKey(
    currentCardPath: CardPath,
    fallback: () => string
  ) {
    const allStats = await getAll({
      sectionKey: currentCardPath.sectionKey,
      deckKey: currentCardPath.deckKey,
    });
    if (!allStats) return fallback();

    const availableStats = allStats.filter(
      (stat) =>
        !(
          stat.sectionKey === currentCardPath.sectionKey &&
          stat.deckKey === currentCardPath.deckKey &&
          stat.cardKey === currentCardPath.cardKey
        )
    );
    for (let progress = 0; progress <= MAX_CARD_PROGRESS; progress++) {
      const stat = getRandomElement(availableStats);
      if (stat.progress <= progress) return stat.cardKey;
    }

    return fallback();
  }

  async function getStat(cardPath: CardPath) {
    return getByPath(cardPath);
  }

  async function getAllStats(anyPath?: Partial<CardPath>) {
    return getAll(anyPath);
  }

  return { init, addStat, getNextCardKey, getStat, getAllStats };
}
