import { User } from '@models';
import {
  Column,
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { AbstractEntity } from '@database/abstract.entity';

@Entity()
export class UserEntity extends AbstractEntity<UserEntity> implements User {
  @Column()
  login: string;

  @Column()
  password: string;

  @VersionColumn()
  version: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
