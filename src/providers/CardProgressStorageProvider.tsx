'use client';

import { createContext, ReactNode, useState } from 'react';
import { getAllStats } from '@/storage/controllers/cardProgress';
import { CardPath, CardProgress } from '@/types';

export const CardProgressStorageContext = createContext<{
  currentCardKey: string;
  allCurrentStats: CardProgress[];
  setCurrentCardKey: (nextCardKey: string) => void;
  refreshDeckStats: (anyPath?: Partial<CardPath>) => void;
}>({
  currentCardKey: '',
  allCurrentStats: [],
  setCurrentCardKey: () => {},
  refreshDeckStats: async () => {},
});

export default function CardProgressStorageProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [currentCardKey, setCurrentCardKey] = useState('');
  const [allCurrentStats, setAllCurrentStats] = useState<CardProgress[]>([]);

  function refreshDeckStats(anyPath?: Partial<CardPath>) {
    getAllStats(anyPath).then((nextStats) =>
      setAllCurrentStats(nextStats ?? [])
    );
  }

  return (
    <CardProgressStorageContext.Provider
      value={{
        currentCardKey,
        allCurrentStats,
        setCurrentCardKey,
        refreshDeckStats,
      }}
    >
      {children}
    </CardProgressStorageContext.Provider>
  );
}
