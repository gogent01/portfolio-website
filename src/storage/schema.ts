import { DBSchema, IDBPTransaction } from 'idb';
import { CardProgress } from '@/types';

export type IdbSchema = DBSchema & {
  'card-progress': {
    key: string;
    value: CardProgress;
    indexes: { cardPath: string };
  };
};

export type CardProgressRWTransaction = IDBPTransaction<
  IdbSchema,
  ['card-progress'],
  'readwrite'
>;
