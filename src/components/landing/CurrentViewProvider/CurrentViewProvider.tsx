'use client';

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';

type ScrollContextProps = {
  currentView: string;
  setCurrentView: Dispatch<SetStateAction<string>>;
};
export const CurrentViewContext = createContext<ScrollContextProps>({
  currentView: 'hero',
  setCurrentView: () => {},
});

function CurrentViewProvider({ children }: { children: ReactNode }) {
  const [currentView, setCurrentView] = useState('hero');

  return (
    <CurrentViewContext.Provider value={{ currentView, setCurrentView }}>
      {children}
    </CurrentViewContext.Provider>
  );
}

export default CurrentViewProvider;
