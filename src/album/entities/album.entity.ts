import { Album } from '@models';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ArtistEntity } from '@artist/entities/artist.entity';

@Entity()
export class AlbumEntity implements Album {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
