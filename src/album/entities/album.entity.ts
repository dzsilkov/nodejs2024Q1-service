import { Album } from '@models';

export class AlbumEntity implements Album {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
}
