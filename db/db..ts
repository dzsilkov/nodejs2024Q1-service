export class Db<T> {
  private db = new Map<string, T>();

  add(id: string, value: T): void {
    this.db.set(id, value);
  }

  findMany(): Array<T> {
    return [...this.db.values()];
  }

  findOne(id: string): T | null {
    return this.db.get(id) ?? null;
  }

  delete(id: string): boolean {
    if (this.db.has(id)) {
      this.db.delete(id);
      return true;
    }
    return false;
  }
}
