import { MAX_CARD_PROGRESS } from '@/config/variables';

export type CardPageProps = {
  params: {
    sectionKey: string;
    deckKey: string;
    cardKey: string;
  };
};

export type Project = {
  position: number;
  title: string;
  role: string;
  description: string;
  purpose: string;
  caseStudy?: string;
  github?: string;
  demo?: string;
};

export type Deck = {
  sectionKey: string;
  key: string;
  title: string;
  description: string;
  cardsPath: string;
  cardKeys: string[];
};

export type Flashcard = {
  id: string;
  key: string;
  title?: string;
  publishedOn: string;
  question: string;
  answer: string;
};

export type CardProgress = {
  cardKey: string;
  deckKey: string;
  sectionKey: string;
  progress: CardProgressRange;
  dayLastRecalled: number;
};

export type CardPath = {
  sectionKey: string;
  deckKey: string;
  cardKey: string;
};

export type CardProgressRange = RangeToUnion<0, typeof MAX_CARD_PROGRESS>;

export type RangeToUnion<
  RangeMin extends number,
  RangeMax extends number,
  Counter extends unknown[] = [],
> = Counter['length'] extends RangeMin
  ? RangeMin extends RangeMax
    ? RangeMin
    :
        | Counter['length']
        | RangeToUnion<
            [...Counter, unknown]['length'],
            RangeMax,
            [...Counter, unknown]
          >
  : RangeToUnion<RangeMin, RangeMax, [...Counter, unknown]>;
