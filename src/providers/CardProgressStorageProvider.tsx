'use client';

import { createContext, ReactNode, useState } from 'react';
import { getAllStats } from '@/storage/controllers/cardProgress';
import { CardPath, CardProgress } from '@/types';

export const CardProgressStorageContext = createContext<{
  currentCardKey: string;
  allCurrentStats: CardProgress[];
  setCurrentCardKey: (nextCardKey: string) => void;
  loadDeckStats: (anyPath?: Partial<CardPath>) => void;
}>({
  currentCardKey: '',
  allCurrentStats: [],
  setCurrentCardKey: () => {},
  loadDeckStats: async () => {},
});

export default function CardProgressStorageProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [currentCardKey, setCurrentCardKey] = useState('');
  const [allCurrentStats, setAllCurrentStats] = useState<CardProgress[]>([]);

  function loadDeckStats(anyPath?: Partial<CardPath>) {
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
        loadDeckStats,
      }}
    >
      {children}
    </CardProgressStorageContext.Provider>
  );
}
