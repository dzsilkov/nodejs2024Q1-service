import { Album, Artist, Track } from '@models';
import { Exclude } from 'class-transformer';

export class FavoritesResponseDto {
  @Exclude()
  id: string;

  @Exclude()
  userId: string;

  artists: Artist[];

  albums: Album[];

  tracks: Track[];
}
