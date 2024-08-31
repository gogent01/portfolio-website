'use client';
import * as React from 'react';

type ScrollContextProps = {
  currentView: string;
  setCurrentView: React.Dispatch<React.SetStateAction<string>>;
};
export const CurrentViewContext = React.createContext<ScrollContextProps>({
  currentView: 'hero',
  setCurrentView: () => {},
});

function CurrentViewProvider({ children }: { children: React.ReactNode }) {
  const [currentView, setCurrentView] = React.useState('hero');

  return (
    <CurrentViewContext.Provider value={{ currentView, setCurrentView }}>
      {children}
    </CurrentViewContext.Provider>
  );
}

export default CurrentViewProvider;
