import { Track } from '@models';
import { Column, Entity, ManyToOne } from 'typeorm';
import { ArtistEntity } from '@artist/entities/artist.entity';
import { AlbumEntity } from '@album/entities/album.entity';
import { AbstractEntity } from '@database/abstract.entity';

@Entity('tracks')
export class TrackEntity extends AbstractEntity<TrackEntity> implements Track {
  @Column()
  name: string;

  @Column()
  duration: number;

  @Column({
    nullable: true,
  })
  artistId: string | null;

  @Column({
    nullable: true,
  })
  albumId: string | null;

  @ManyToOne(() => AlbumEntity, { onDelete: 'SET NULL' })
  album: AlbumEntity | null;

  @ManyToOne(() => ArtistEntity, { onDelete: 'SET NULL' })
  artist: ArtistEntity | null;
}
