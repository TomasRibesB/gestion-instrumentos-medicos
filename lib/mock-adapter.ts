import { MockDB } from '@/types';
import initialData from '@/data/mock-db.json';

// Clave para localStorage
const DB_KEY = 'tdm_mock_db_v2';

// Tiempo de retraso simulado (ms)
const DELAY = 300;

class MockAdapter {
  private db: MockDB;

  constructor() {
    this.db = this.loadDB();
  }

  private loadDB(): MockDB {
    if (typeof window === 'undefined') {
      // Server-side (during build or SSR), return initial data but consistent with types
      return initialData as unknown as MockDB;
    }

    const stored = localStorage.getItem(DB_KEY);
    if (stored) {
      try {
        return JSON.parse(stored) as MockDB;
      } catch (e) {
        console.error('Error parsing mock DB, resetting:', e);
      }
    }
    // Si no hay dato guardado, usar semilla
    this.saveDB(initialData as unknown as MockDB);
    return initialData as unknown as MockDB;
  }

  private saveDB(data: MockDB) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(DB_KEY, JSON.stringify(data));
    }
    this.db = data;
  }

  private async delay() {
    return new Promise(resolve => setTimeout(resolve, DELAY));
  }

  async get<K extends keyof MockDB>(collection: K): Promise<MockDB[K]> {
    await this.delay();
    return this.db[collection];
  }

  async update<K extends keyof MockDB>(collection: K, data: MockDB[K]): Promise<void> {
    await this.delay();
    const newDB = { ...this.db, [collection]: data };
    this.saveDB(newDB);
  }

  // Reset para desarrollo
  resetDB() {
    this.saveDB(initialData as unknown as MockDB);
    window.location.reload();
  }
}

export const mockAdapter = new MockAdapter();
