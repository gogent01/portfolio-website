'use client';

import { createContext, ReactNode } from 'react';
import { useCardProgressController } from '@/hooks/useCardProgressController';

export const CardProgressStorageContext = createContext<
  ReturnType<typeof useCardProgressController>
>({
  init: async () => {},
  addStat: async () => {},
  getNextCardKey: async () => '',
  getStat: async () => undefined,
});

export default function CardProgressStorageProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { init, addStat, getNextCardKey, getStat } =
    useCardProgressController();

  return (
    <CardProgressStorageContext.Provider
      value={{ init, addStat, getNextCardKey, getStat }}
    >
      {children}
    </CardProgressStorageContext.Provider>
  );
}
