import { Track } from '@models';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
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
  // @OneToOne(() => ArtistEntity, { onDelete: 'SET NULL' })
  // @JoinColumn({ name: 'artistId' })
  artistId: string | null;

  @Column({
    nullable: true,
  })
  // @OneToOne(() => AlbumEntity, { onDelete: 'SET NULL' })
  // @JoinColumn({ name: 'albumId' })
  albumId: string | null;

  @ManyToOne(() => AlbumEntity, { onDelete: 'SET NULL' })
  album: AlbumEntity | null;

  @ManyToOne(() => ArtistEntity, { onDelete: 'SET NULL' })
  artist: ArtistEntity | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
