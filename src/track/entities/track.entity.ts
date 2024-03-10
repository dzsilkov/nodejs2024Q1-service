import { Track } from '@models';

export class TrackEntity implements Track {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}
