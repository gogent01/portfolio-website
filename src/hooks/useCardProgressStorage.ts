'use client';

import { DBSchema, IDBPTransaction, openDB } from 'idb';
import { CardPath, CardProgress } from '@/types';

type Schema = DBSchema & {
  'card-progress': {
    key: string;
    value: CardProgress;
    indexes: { cardPath: string };
  };
};

type CardProgressRWTransaction = IDBPTransaction<
  Schema,
  ['card-progress'],
  'readwrite'
>;
export function useCardProgressStorage() {
  function getDb() {
    return openDB<Schema>('card-progress', 1, {
      upgrade(db) {
        const store = db.createObjectStore('card-progress', {
          keyPath: 'id',
          autoIncrement: true,
        });
        store.createIndex('cardPath', ['sectionKey', 'deckKey', 'cardKey'], {
          unique: true,
        });
      },
    });
  }

  async function populate(data: CardProgress[]) {
    const transaction = await getTransaction();
    if (!transaction) return;

    await Promise.all(
      data.map((progress) => {
        create(progress, transaction)?.catch(() => {});
      })
    );
  }

  async function getTransaction(): Promise<
    CardProgressRWTransaction | undefined
  > {
    const db = await getDb();

    return db.transaction('card-progress', 'readwrite');
  }

  async function create(
    progress: CardProgress,
    transaction?: CardProgressRWTransaction
  ) {
    const db = await getDb();
    let dbInstance = transaction ? transaction.db : db;

    return dbInstance.add('card-progress', progress);
  }

  async function createOrUpdate(
    progress: CardProgress,
    transaction?: CardProgressRWTransaction
  ) {
    const db = await getDb();
    let dbInstance = transaction ? transaction.db : db;

    return dbInstance.put('card-progress', progress);
  }

  async function getByPath(
    cardPath: CardPath,
    transaction?: CardProgressRWTransaction
  ) {
    const db = await getDb();
    let dbInstance = transaction ? transaction.db : db;

    const range = IDBKeyRange.only([
      cardPath.sectionKey,
      cardPath.deckKey,
      cardPath.cardKey,
    ]);
    return dbInstance.getFromIndex('card-progress', 'cardPath', range);
  }

  async function getAll(transaction?: CardProgressRWTransaction) {
    const db = await getDb();
    let dbInstance = transaction ? transaction.db : db;
    if (!dbInstance) return;

    return dbInstance.getAll('card-progress');
  }

  return {
    populate,
    getTransaction,
    create,
    createOrUpdate,
    getByPath,
    getAll,
  };
}
