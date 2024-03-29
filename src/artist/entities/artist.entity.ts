import { Artist } from '@models';
import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '@database/abstract.entity';

@Entity('artists')
export class ArtistEntity
  extends AbstractEntity<ArtistEntity>
  implements Artist
{
  @Column()
  name: string;

  @Column()
  grammy: boolean;
}
