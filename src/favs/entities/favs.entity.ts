import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ArtistEntity } from '@artist/entities/artist.entity';
import { AlbumEntity } from '@album/entities/album.entity';
import { TrackEntity } from '@track/entities/track.entity';

@Entity()
export class FavsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
