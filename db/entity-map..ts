export class EntityMap<T> {
  private entity = new Map<string, T>();

  add(id: string, value: T): void {
    this.entity.set(id, value);
  }

  findMany(): Array<T> {
    return [...this.entity.values()];
  }

  findOne(id: string): T | null {
    return this.entity.get(id) ?? null;
  }

  delete(id: string): boolean {
    if (this.entity.has(id)) {
      this.entity.delete(id);
      return true;
    }
    return false;
  }
}
