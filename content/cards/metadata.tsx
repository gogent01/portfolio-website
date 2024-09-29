import { Deck } from '@/types';
import TYPOGRAPHY from '@content/cards/css/typography/metadata';
import CODE_COMPLETE_FOUNDATION from '@content/cards/code-complete/foundation/metadata';
import CODE_COMPLETE_ARCHITECTURE from '@content/cards/code-complete/architecture/metadata';

export const ALL_DECKS: Deck[] = [
  TYPOGRAPHY(),
  CODE_COMPLETE_FOUNDATION(),
  CODE_COMPLETE_ARCHITECTURE(),
];
