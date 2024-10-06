import { ReactNode } from 'react';

import CardProgressStorageProvider from '@/providers/CardProgressStorageProvider';
import { ALL_DECKS } from '@content/cards/metadata';

import DbInit from '@/components/cards/DbInit';
import BodyBackground from '@/components/cards/BodyBackground';

import SidebarNavigation from '@/components/cards/SidebarNavigation';

export default async function Layout(props: {
  params: { sectionKey: string; deckKey: string };
  children: ReactNode;
}) {
  const { params, children } = props;
  const { deckKey } = params;
  const deck = ALL_DECKS.find((deck) => deck.key === deckKey)!;

  return (
    <CardProgressStorageProvider>
      <DbInit deck={deck} />
      <BodyBackground>
        <SidebarNavigation deck={deck}>{children}</SidebarNavigation>
      </BodyBackground>
    </CardProgressStorageProvider>
  );
}
