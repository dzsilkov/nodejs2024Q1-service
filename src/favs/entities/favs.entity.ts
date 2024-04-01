import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { ArtistEntity } from '@artist/entities/artist.entity';
import { AlbumEntity } from '@album/entities/album.entity';
import { TrackEntity } from '@track/entities/track.entity';
import { AbstractEntity } from '@database/abstract.entity';

@Entity('favs')
export class FavsEntity extends AbstractEntity<FavsEntity> {
  @Column('uuid')
  userId: string;

  @ManyToMany(() => ArtistEntity, { eager: true })
  @JoinTable()
  artists: ArtistEntity[];

  @ManyToMany(() => AlbumEntity, { eager: true })
  @JoinTable()
  albums: AlbumEntity[];

  @ManyToMany(() => TrackEntity, { eager: true })
  @JoinTable()
  tracks: TrackEntity[];
}
