export interface IndexedDBIt {
  loadFromDB: (key: string) => Promise<unknown>;
  openDatabase: () => Promise<IDBDatabase>;
  saveToDB: (key: string, value: unknown) => Promise<void>;
}
