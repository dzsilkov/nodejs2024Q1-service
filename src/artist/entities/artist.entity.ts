import { Artist } from '@models';

export class ArtistEntity implements Artist {
  id: string;
  name: string;
  grammy: boolean;
}
