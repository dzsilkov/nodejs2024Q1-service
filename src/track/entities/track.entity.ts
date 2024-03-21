import { Track } from '@models';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ArtistEntity } from '@artist/entities/artist.entity';
import { AlbumEntity } from '@album/entities/album.entity';

@Entity()
export class TrackEntity implements Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
