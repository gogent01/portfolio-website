import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Code } from 'bright';

import SidebarNavigation from '@/components/cards/SidebarNavigation';
import { Heading } from '@/components/catalyst/heading';
import { Text } from '@/components/catalyst/text';
import { Divider } from '@/components/catalyst/divider';
import CardButtons from '@/components/cards/CardButtons';

import { ALL_DECKS } from '@content/cards/metadata';
import { checkCardIds, loadCard } from '@/helpers';
import { CardPageProps } from '@/types';

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
    <article className="h-full sm:max-w-screen-sm mx-auto flex flex-col">
      <Text>{card.question}</Text>
      <Divider className="my-4" />
      <Text as="div">
        <MDXRemote
          source={card.answer}
          components={{
            h1: (props) => (
              <Heading {...props} level={1} className="mt-9 -mb-3 first:mt-0" />
            ),
            h2: (props) => (
              <Heading {...props} level={2} className="mt-9 -mb-2 first:mt-0" />
            ),
            h3: (props) => (
              <Heading {...props} level={3} className="mt-9 -mb-3 first:mt-0" />
            ),
            p: (props) => <Text {...props} className="mt-3 first:mt-0" />,
            ol: (props) => (
              <ol
                {...props}
                className="mt-3 first:mt-0 list-decimal list-inside"
              />
            ),
            blockquote: (props) => (
              <blockquote
                {...props}
                className="ml-6 mt-3 first:mt-0 px-4 py-3 border-l-4 bg-zinc-500/10 text-zinc-500 dark:bg-zinc-300/10 dark:text-zinc-300/90 sm:ml-12"
              />
            ),
            ul: (props) => (
              <ul
                {...props}
                className="mt-3 first:mt-0 list-disc list-inside"
              />
            ),
            code: (props) => (
              <code
                {...props}
                className="rounded border border-zinc-950/10 bg-zinc-950/[2.5%] px-1 py-px text-[0.8125rem] font-medium text-zinc-950 dark:border-white/20 dark:bg-white/5 dark:text-amber-200/85 md:py-0.5"
              />
            ),
            pre: (props) => <Code className="text-sm" {...props} />,
          }}
        />
      </Text>

      <CardButtons
        deck={deck}
        card={card}
        currentSide="answer"
        className="mt-auto"
      />
    </article>
  );
}
