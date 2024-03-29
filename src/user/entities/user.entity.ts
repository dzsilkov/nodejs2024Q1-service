import { User } from '@models';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  OneToMany,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { AbstractEntity } from '@database/abstract.entity';
import { TokenEntity } from '@auth/entities/token.entity';

@Entity('users')
export class UserEntity extends AbstractEntity<UserEntity> implements User {
  @Column()
  login: string;

  @Column()
  password: string;

  @VersionColumn()
  version: number;

  @OneToMany(() => TokenEntity, (token) => token.user)
  // @JoinTable()
  token: TokenEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
