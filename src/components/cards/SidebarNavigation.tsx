'use client';

import { ReactNode, useContext, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { getStat } from '@/storage/controllers/cardProgress';
import { CardProgressStorageContext } from '@/providers/CardProgressStorageProvider';

import { SidebarLayout } from '@/components/catalyst/sidebar-layout';
import {
  Sidebar,
  SidebarBody,
  SidebarDivider,
  SidebarItem,
  SidebarSection,
} from '@/components/catalyst/sidebar';
import { Navbar, NavbarItem, NavbarSpacer } from '@/components/catalyst/navbar';
import ProgressIconCircle from '@/components/cards/ProgressIconCircle';
import { Heading } from '@/components/catalyst/heading';
import { kebabToTitleCase } from '@/utils';

import { CardProgress, Deck } from '@/types';
import ProgressIconDots from '@/components/cards/ProgressIconDots';

type SidebarNavigationProps = {
  deck: Deck;
  children: ReactNode;
};

export default function SidebarNavigation(props: SidebarNavigationProps) {
  const { deck, children } = props;
  const [currentCardStat, setCurrentCardStat] = useState<
    CardProgress | undefined
  >(undefined);
  const { currentCardKey, allCurrentStats } = useContext(
    CardProgressStorageContext
  );

  useEffect(() => {
    getStat({
      sectionKey: deck.sectionKey,
      deckKey: deck.key,
      cardKey: currentCardKey,
    }).then((stat) => setCurrentCardStat(stat));
  }, [deck.sectionKey, deck.key, currentCardKey]);

  return (
    <SidebarLayout
      navbar={
        <Navbar>
          <NavbarSpacer />
          <NavbarItem>
            <ProgressIconCircle
              progress={currentCardStat?.progress ?? 0}
              size={24}
              variant="base"
            />
          </NavbarItem>
        </Navbar>
      }
      sidebar={
        <Sidebar>
          <SidebarBody>
            <SidebarSection>
              <div className="mb-1 px-2 space-y-2">
                <Heading level={1} className="!text-xs uppercase opacity-50">
                  {deck.title}
                </Heading>
                <div className="flex items-start gap-2 -translate-x-0.5">
                  <ProgressIconCircle
                    progress={currentCardStat?.progress ?? 0}
                    size={24}
                    variant="accent"
                  />
                  <AnimatePresence>
                    <motion.h2
                      key={currentCardKey}
                      initial={{ opacity: 0, x: 5 }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        transition: {
                          duration: 0.4,
                          delay: 0.3,
                        },
                      }}
                      exit={{ opacity: 0, transition: { duration: 0.2 } }}
                      className="min-w-48 -mt-0.5 text-xl/7 sm:text-lg/7 text-zinc-900 font-semibold dark:text-zinc-100 lg:min-h-24"
                      style={{
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 3,
                        overflow: 'hidden',
                      }}
                    >
                      {kebabToTitleCase(currentCardKey)}
                    </motion.h2>
                  </AnimatePresence>
                </div>
              </div>
            </SidebarSection>

            <SidebarDivider />

            <SidebarSection>
              {allCurrentStats.map(
                ({ sectionKey, deckKey, cardKey, progress }) => (
                  <SidebarItem
                    key={cardKey}
                    current={cardKey === currentCardKey}
                    href={`/cards/${sectionKey}/${deckKey}/${cardKey}/question`}
                  >
                    <div className="">
                      {kebabToTitleCase(cardKey)
                        .split(' ')
                        .slice(0, -1)
                        .join(' ')}{' '}
                      <span className="whitespace-nowrap">
                        {kebabToTitleCase(cardKey)
                          .split(' ')
                          .slice(-1)
                          .join(' ')}
                        &nbsp;&nbsp;
                        <ProgressIconDots progress={progress} />
                      </span>
                    </div>
                  </SidebarItem>
                )
              )}
            </SidebarSection>
          </SidebarBody>
        </Sidebar>
      }
    >
      {children}
    </SidebarLayout>
  );
}
