import { Album, Artist, Track } from '@models';

export class FavoritesResponseDto {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
