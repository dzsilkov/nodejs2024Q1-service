import { User } from '@models';
import { Exclude } from 'class-transformer';

export class UserEntity implements User {
  id: string;

  login: string;

  @Exclude()
  password: string;

  version: number;

  createdAt: number;

  updatedAt: number;
}
