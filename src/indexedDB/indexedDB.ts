import { IndexedDBIt } from "../types/indexedDB/IndexedDBIt.ts";

const DB_NAME = "TimerDB";
const STORE_NAME = "TimerStore";

export const IndexedDB = (): IndexedDBIt => {
  const openDatabase = (): Promise<IDBDatabase> =>
    new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, 1);

      request.onupgradeneeded = (): void => {
        const db = request.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: "key" });
        }
      };

      request.onsuccess = (): void => resolve(request.result);
      request.onerror = (): void => reject(request.error);
    });

  const saveToDB = async (key: string, value: unknown) => {
    const db = await openDatabase();
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    store.put({ key, value });
    return new Promise<void>((resolve, reject) => {
      transaction.oncomplete = (): void => resolve();
      transaction.onerror = (): void => reject(transaction.error);
    });
  };

  const loadFromDB = async (key: string): Promise<unknown> => {
    const db = await openDatabase();
    const transaction = db.transaction(STORE_NAME, "readonly");
    const store = transaction.objectStore(STORE_NAME);
    return new Promise((resolve, reject) => {
      const request = store.get(key);
      request.onsuccess = (): void => resolve(request.result?.value || null);
      request.onerror = (): void => reject(request.error);
    });
  };

  return {
    openDatabase,
    saveToDB,
    loadFromDB,
  };
};
