import { openDB } from 'idb';
import { CardPath, CardProgress, CardProgressRange } from '@/types';
import { MAX_CARD_PROGRESS } from '@/config/variables';
import { getRandomElement } from '@/utils';
import { CardProgressRWTransaction, IdbSchema } from '@/storage/schema';

export async function addStat(
  cardPath: CardPath,
  outcome: 'recalled' | 'forgot'
) {
  const t = await getTransaction();

  const cardProgress = await getByPath(cardPath, t);
  if (!cardProgress) return;

  if (outcome === 'forgot') {
    cardProgress.progress = Math.max(
      cardProgress.progress - 2,
      0
    ) as CardProgressRange;
  } else {
    cardProgress.dayLastRecalled = new Date().getDate();
    cardProgress.progress = Math.min(
      cardProgress.progress + 1,
      MAX_CARD_PROGRESS
    ) as CardProgressRange;
  }

  await createOrUpdate(cardProgress, t);
}

export async function getNextCardKey(
  currentCardPath: CardPath,
  fallback: () => string
) {
  const allStats = (
    (await getAll({
      sectionKey: currentCardPath.sectionKey,
      deckKey: currentCardPath.deckKey,
    })) ?? []
  ).filter(Boolean);
  if (allStats.length === 0) return fallback();

  const ec = exceptCurrentCard(allStats, currentCardPath);
  const ecr = exceptRecalledToday(ec);
  const availableStats = ecr.length > 0 ? ecr : ec;

  for (let progress = 0; progress <= MAX_CARD_PROGRESS; progress++) {
    const stat = getRandomElement(availableStats);
    if (stat.progress <= progress) return stat.cardKey;
  }

  return fallback();
}

function exceptCurrentCard(
  allStats: CardProgress[],
  currentCardPath: CardPath
) {
  return allStats.filter(
    (stat) =>
      !(
        stat.sectionKey === currentCardPath.sectionKey &&
        stat.deckKey === currentCardPath.deckKey &&
        stat.cardKey === currentCardPath.cardKey
      )
  );
}

export function exceptRecalledToday(allStats: CardProgress[]) {
  const todayDate = new Date().getDate();
  return allStats.filter(
    (stat) => stat.progress < 3 || stat.dayLastRecalled !== todayDate
  );
}

export async function getStat(cardPath: CardPath) {
  return getByPath(cardPath);
}

export async function getAllStats(anyPath?: Partial<CardPath>) {
  return getAll(anyPath);
}

function getDb() {
  return openDB<IdbSchema>('card-progress', 22, {
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

export async function populateStats(stats: CardProgress[]) {
  const transaction = await getTransaction();
  if (!transaction) return;

  await Promise.all(
    stats.map((stat) => {
      create(stat, transaction)?.catch(() => {});
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

export async function getAll(
  anyPath?: Partial<CardPath>,
  transaction?: CardProgressRWTransaction
) {
  const db = await getDb();
  let dbInstance = transaction ? transaction.db : db;
  if (!dbInstance) return;

  let allProgress = (await dbInstance.getAll('card-progress')).filter(Boolean);

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
