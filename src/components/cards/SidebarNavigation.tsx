'use client';

import { Navbar, NavbarSpacer } from '@/components/catalyst/navbar';
import {
  Sidebar,
  SidebarBody,
  SidebarHeading,
  SidebarSection,
} from '@/components/catalyst/sidebar';
import { ReactNode, useContext, useEffect, useState } from 'react';
import { SidebarLayout } from '@/components/catalyst/sidebar-layout';
import { CardProgressRange, Deck, Flashcard } from '@/types';
import { CardProgressStorageContext } from '@/providers/CardProgressStorageProvider';
import { Text } from '@/components/catalyst/text';

type SidebarNavigationProps = {
  deck: Deck;
  card: Flashcard;
  children: ReactNode;
};

export default function SidebarNavigation(props: SidebarNavigationProps) {
  const { deck, card, children } = props;
  const { getStat } = useContext(CardProgressStorageContext);
  const [progress, setProgress] = useState<CardProgressRange | null>(null);

  useEffect(() => {
    getStat({
      sectionKey: deck.sectionKey,
      deckKey: deck.key,
      cardKey: card.key,
    }).then((stat) => {
      if (stat) setProgress(stat.progress);
      else setProgress(null);
    });
  }, [deck.sectionKey, deck.key, card.key]);

  return (
    <SidebarLayout
      navbar={
        <Navbar>
          <NavbarSpacer />
        </Navbar>
      }
      sidebar={
        <Sidebar>
          <SidebarBody>
            <SidebarSection>
              <SidebarHeading>{deck.title}</SidebarHeading>
            </SidebarSection>
          </SidebarBody>
        </Sidebar>
      }
    >
      {progress !== null && (
        <Text className="fixed top-4 right-5 h-8 w-8 flex items-center justify-center rounded-lg border border-zinc-500 dark:border-zinc-300/90">
          {progress}
        </Text>
      )}
      {children}
    </SidebarLayout>
  );
}
