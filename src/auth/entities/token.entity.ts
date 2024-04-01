import { AbstractEntity } from '@database/abstract.entity';
import { Column, Entity, JoinTable, ManyToOne } from 'typeorm';
import { UserEntity } from '@user/entities/user.entity';

@Entity('tokens')
export class TokenEntity extends AbstractEntity<TokenEntity> {
  @Column('uuid')
  userId: string;

  @Column()
  token: string;

  @ManyToOne(() => UserEntity, (user) => user.token, { onDelete: 'CASCADE' })
  // @JoinTable()
  user: UserEntity;
}
