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
