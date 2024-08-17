import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Code } from 'bright';

import { SidebarLayout } from '@/components/catalyst/sidebar-layout';
import { Navbar, NavbarSpacer } from '@/components/catalyst/navbar';
import {
  Sidebar,
  SidebarBody,
  SidebarHeading,
  SidebarSection,
} from '@/components/catalyst/sidebar';
import { Text } from '@/components/catalyst/text';
import { Divider } from '@/components/catalyst/divider';

import { ALL_DECKS } from '@/content/cards/metadata';
import { checkCardIds, loadCard } from '@/helpers';

type CardPageProps = {
  params: {
    sectionKey: string;
    deckKey: string;
    cardKey: string;
  };
};

export async function generateMetadata(props: CardPageProps): Promise<{
  title: string;
  description: string;
}> {
  const { sectionKey, deckKey, cardKey } = props.params;
  const card = await loadCard(sectionKey, deckKey, cardKey);

  if (!card) return notFound();

  return {
    title: card.title || card.question,
    description: card.question,
  };
}

export async function generateStaticParams(): Promise<
  {
    sectionKey: string;
    deckKey: string;
    cardKey: string;
  }[]
> {
  await checkCardIds();

  return ALL_DECKS.flatMap((deck) =>
    deck.cardKeys.map((cardKey) => ({
      sectionKey: deck.sectionKey,
      deckKey: deck.key,
      cardKey,
    }))
  );
}

export const dynamicParams = false;
export const dynamic = 'error';

export default async function Page(props: CardPageProps) {
  const { sectionKey, deckKey, cardKey } = props.params;
  const card = await loadCard(sectionKey, deckKey, cardKey);

  if (!card) return notFound();

  const deck = ALL_DECKS.find((deck) => deck.key === deckKey)!;

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
      <article className="max-w-screen-sm mx-auto">
        <Text>{card.question}</Text>
        <Divider className="my-4" />
        <Text>
          <MDXRemote
            source={card.answer}
            components={{
              p: (props) => (
                <p {...props} className="mt-3 first-of-type:mt-0" />
              ),
              ol: (props) => (
                <ol {...props} className="list-decimal list-inside" />
              ),
              ul: (props) => (
                <ul {...props} className="list-disc list-inside" />
              ),
              code: (props) => (
                <code
                  {...props}
                  className="rounded border border-zinc-950/10 bg-zinc-950/[2.5%] px-1 py-0.5 text-sm font-medium text-zinc-950 sm:text-[0.8125rem] dark:border-white/20 dark:bg-white/5 dark:text-amber-200/85"
                />
              ),
              pre: (props) => <Code {...props} />,
            }}
          />
        </Text>
      </article>
    </SidebarLayout>
  );
}
