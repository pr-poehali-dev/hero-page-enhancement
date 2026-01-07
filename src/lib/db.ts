// IndexedDB helper для хранения больших медиа-файлов
const DB_NAME = 'TheLastWeekDB';
const DB_VERSION = 1;
const MEDIA_STORE = 'mediaItems';

let db: IDBDatabase | null = null;

const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    if (db) {
      resolve(db);
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      db = request.result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const database = (event.target as IDBOpenDBRequest).result;
      if (!database.objectStoreNames.contains(MEDIA_STORE)) {
        database.createObjectStore(MEDIA_STORE, { keyPath: 'id' });
      }
    };
  });
};

export const saveMediaToDB = async (mediaItem: any): Promise<void> => {
  const database = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction([MEDIA_STORE], 'readwrite');
    const store = transaction.objectStore(MEDIA_STORE);
    const request = store.put(mediaItem);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

export const getAllMediaFromDB = async (): Promise<any[]> => {
  const database = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction([MEDIA_STORE], 'readonly');
    const store = transaction.objectStore(MEDIA_STORE);
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result || []);
    request.onerror = () => reject(request.error);
  });
};

export const deleteMediaFromDB = async (id: number): Promise<void> => {
  const database = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction([MEDIA_STORE], 'readwrite');
    const store = transaction.objectStore(MEDIA_STORE);
    const request = store.delete(id);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};
