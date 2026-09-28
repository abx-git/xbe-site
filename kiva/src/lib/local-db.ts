const DB_NAME = 'kiva-local';
const DB_VERSION = 1;

export interface LocalDb {
  put<T>(store: string, value: T & { id: string }): Promise<void>;
  get<T>(store: string, id: string): Promise<T | undefined>;
  getAll<T>(store: string): Promise<T[]>;
}

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onerror = () => reject(req.error);
    req.onsuccess = () => resolve(req.result);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains('instructions')) {
        db.createObjectStore('instructions', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('artifacts')) {
        db.createObjectStore('artifacts', { keyPath: 'id' });
      }
    };
  });
}

export function createLocalDb(): LocalDb {
  return {
    async put(store, value) {
      const db = await openDb();
      await new Promise<void>((resolve, reject) => {
        const tx = db.transaction(store, 'readwrite');
        tx.oncomplete = () => {
          db.close();
          resolve();
        };
        tx.onerror = () => reject(tx.error);
        tx.objectStore(store).put(value);
      });
    },
    async get(store, id) {
      const db = await openDb();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(store, 'readonly');
        tx.onerror = () => reject(tx.error);
        const req = tx.objectStore(store).get(id);
        req.onsuccess = () => {
          db.close();
          resolve(req.result as undefined);
        };
        req.onerror = () => reject(req.error);
      });
    },
    async getAll(store) {
      const db = await openDb();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(store, 'readonly');
        tx.onerror = () => reject(tx.error);
        const req = tx.objectStore(store).getAll();
        req.onsuccess = () => {
          db.close();
          resolve(req.result as []);
        };
        req.onerror = () => reject(req.error);
      });
    },
  };
}
