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
    return openDB<Schema>('card-progress', 22, {
      async upgrade(db, oldVersion, newVersion, transaction) {
        let oldData: any[] = [];

        if (db.objectStoreNames.contains('card-progress')) {
          oldData = await ((
            transaction.store as unknown as IDBObjectStore
          ).getAll() as unknown as Promise<CardProgress[]>);
          db.deleteObjectStore('card-progress');
        }

        const newData = oldData.filter(Boolean).map((record) => {
          if (record.hasOwnProperty('dayLastRecalled')) return record;
          return {
            ...record,
            dayLastRecalled: 0,
          };
        });

        const store = db.createObjectStore('card-progress', {
          keyPath: 'id',
          autoIncrement: true,
        });
        store.createIndex('cardPath', ['sectionKey', 'deckKey', 'cardKey'], {
          unique: true,
        });

        await Promise.all(newData.map((record) => store.add(record)));
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

  async function getAll(
    anyPath?: Partial<CardPath>,
    transaction?: CardProgressRWTransaction
  ) {
    const db = await getDb();
    let dbInstance = transaction ? transaction.db : db;
    if (!dbInstance) return;

    let allProgress = (await dbInstance.getAll('card-progress')).filter(
      Boolean
    );

    const { sectionKey, deckKey, cardKey } = anyPath ?? {};
    if (cardKey) {
      allProgress = allProgress.filter(
        (progress) => progress.cardKey === cardKey
      );
    }
    if (deckKey) {
      allProgress = allProgress.filter(
        (progress) => progress.deckKey === deckKey
      );
    }
    if (sectionKey) {
      allProgress = allProgress.filter(
        (progress) => progress.sectionKey === sectionKey
      );
    }

    return allProgress;
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
