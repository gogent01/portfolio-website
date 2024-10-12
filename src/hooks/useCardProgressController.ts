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
      cardProgress.progress = Math.max(
        cardProgress.progress - 2,
        0
      ) as CardProgressRange;
    } else {
      cardProgress.dayLastRecalled = new Date().getDate();
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
    const allStats = (
      (await getAll({
        sectionKey: currentCardPath.sectionKey,
        deckKey: currentCardPath.deckKey,
      })) ?? []
    ).filter(Boolean);
    if (allStats.length === 0) return fallback();

    const ec = exceptCurrentCard(allStats, currentCardPath);
    const ecr = exceptRecalledToday(ec);
    const availableStats = ecr.length > 0 ? ecr : ec;

    for (let progress = 0; progress <= MAX_CARD_PROGRESS; progress++) {
      const stat = getRandomElement(availableStats);
      if (stat.progress <= progress) return stat.cardKey;
    }

    return fallback();
  }

  function exceptCurrentCard(
    allStats: CardProgress[],
    currentCardPath: CardPath
  ) {
    return allStats.filter(
      (stat) =>
        !(
          stat.sectionKey === currentCardPath.sectionKey &&
          stat.deckKey === currentCardPath.deckKey &&
          stat.cardKey === currentCardPath.cardKey
        )
    );
  }

  function exceptRecalledToday(allStats: CardProgress[]) {
    const todayDate = new Date().getDate();
    return allStats.filter(
      (stat) => stat.progress < 3 || stat.dayLastRecalled !== todayDate
    );
  }

  async function getStat(cardPath: CardPath) {
    return getByPath(cardPath);
  }

  async function getAllStats(anyPath?: Partial<CardPath>) {
    return getAll(anyPath);
  }

  return { init, addStat, getNextCardKey, getStat, getAllStats };
}
