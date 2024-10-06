'use client';

import { createContext, ReactNode, useState } from 'react';
import { useCardProgressController } from '@/hooks/useCardProgressController';
import { CardPath, CardProgress } from '@/types';

export const CardProgressStorageContext = createContext<
  ReturnType<typeof useCardProgressController> & {
    currentCardKey: string;
    allCurrentStats: CardProgress[];
    setCurrentCardKey: (nextCardKey: string) => void;
    updateAllCurrentStats: (anyPath?: Partial<CardPath>) => void;
  }
>({
  currentCardKey: '',
  allCurrentStats: [],
  init: async () => {},
  addStat: async () => {},
  getNextCardKey: async () => '',
  getStat: async () => undefined,
  getAllStats: async () => [],
  setCurrentCardKey: () => {},
  updateAllCurrentStats: async () => {},
});

export default function CardProgressStorageProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { init, addStat, getNextCardKey, getStat, getAllStats } =
    useCardProgressController();
  const [currentCardKey, setCurrentCardKey] = useState('');
  const [allCurrentStats, setAllCurrentStats] = useState<CardProgress[]>([]);

  function updateAllCurrentStats(anyPath?: Partial<CardPath>) {
    getAllStats(anyPath).then((nextStats) =>
      setAllCurrentStats(nextStats ?? [])
    );
  }

  return (
    <CardProgressStorageContext.Provider
      value={{
        currentCardKey,
        allCurrentStats,
        init,
        addStat,
        getNextCardKey,
        getStat,
        getAllStats,
        setCurrentCardKey,
        updateAllCurrentStats,
      }}
    >
      {children}
    </CardProgressStorageContext.Provider>
  );
}
