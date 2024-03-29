import { Album } from '@models';
import { Column, Entity, ManyToOne } from 'typeorm';
import { ArtistEntity } from '@artist/entities/artist.entity';
import { AbstractEntity } from '@database/abstract.entity';

@Entity('albums')
export class AlbumEntity extends AbstractEntity<AlbumEntity> implements Album {
  @Column()
  name: string;

  @Column()
  year: number;

  @Column({
    nullable: true,
  })
  artistId: string | null;

  @ManyToOne(() => ArtistEntity, { onDelete: 'SET NULL' })
  artist: string | null;
}
