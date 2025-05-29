// Simple in-memory database for demonstration
export interface DatabaseConnection {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
}

export class InMemoryDatabase implements DatabaseConnection {
  private data: Map<string, any> = new Map();
  private connected: boolean = false;

  async connect(): Promise<void> {
    this.connected = true;
    console.log('In-memory database connected');
  }

  async disconnect(): Promise<void> {
    this.connected = false;
    this.data.clear();
    console.log('In-memory database disconnected');
  }

  get<T>(collection: string): T[] {
    if (!this.connected) {
      throw new Error('Database not connected');
    }
    const collectionData = this.data.get(collection) || new Map<string, T>();
    return Array.from(collectionData.values());
  }

  getById<T>(collection: string, id: string): T | null {
    if (!this.connected) {
      throw new Error('Database not connected');
    }
    const collectionData = this.data.get(collection) as Map<string, T>;
    return collectionData?.get(id) || null;
  }

  set<T extends { id: string }>(collection: string, item: T): T {
    if (!this.connected) {
      throw new Error('Database not connected');
    }
    if (!this.data.has(collection)) {
      this.data.set(collection, new Map());
    }
    const collectionData = this.data.get(collection) as Map<string, T>;
    collectionData.set(item.id, item);
    return item;
  }

  update<T extends { id: string }>(collection: string, id: string, updates: Partial<T>): T | null {
    if (!this.connected) {
      throw new Error('Database not connected');
    }
    const collectionData = this.data.get(collection) as Map<string, T>;
    const existing = collectionData?.get(id);
    if (!existing) return null;
    
    const updated = { ...existing, ...updates };
    collectionData.set(id, updated);
    return updated;
  }

  delete(collection: string, id: string): boolean {
    if (!this.connected) {
      throw new Error('Database not connected');
    }
    const collectionData = this.data.get(collection) as Map<string, any>;
    return collectionData?.delete(id) || false;
  }
}