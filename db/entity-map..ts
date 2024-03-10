import { Observable, Subject } from 'rxjs';

export class EntityMap<T> {
  private entity = new Map<string, T>();
  private pFavoritesIds: string[] = [];
  private entityRemovedSource: Subject<string> = new Subject();
  public entityRemoved: Observable<string> =
    this.entityRemovedSource.asObservable();

  get favoritesIds(): string[] {
    return this.pFavoritesIds;
  }

  add(id: string, value: T): void {
    this.entity.set(id, value);
  }

  findAll(): Array<T> {
    return [...this.entity.values()];
  }

  findMany(ids: Array<string>): Array<T> {
    return ids.map((id) => this.findOne(id));
  }

  findOne(id: string): T | null {
    return this.entity.get(id) ?? null;
  }

  delete(id: string): boolean {
    if (this.entity.has(id)) {
      this.entity.delete(id);
      this.removeFromFavorites(id);
      this.entityRemovedSource.next(id);
      return true;
    }
    return false;
  }

  addToFavorites(id: string): void {
    this.pFavoritesIds.push(id);
  }

  getFavorites(): Array<T> {
    return this.findMany(this.favoritesIds);
  }

  removeFromFavorites(id: string): void {
    this.pFavoritesIds = this.favoritesIds.filter((favId) => favId !== id);
  }

  forEach(fn: (entity: T) => void) {
    this.entity.forEach(fn);
  }
}
