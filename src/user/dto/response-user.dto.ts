import { ResponseUser } from '@models';
import { Exclude, Transform } from 'class-transformer';

export class ResponseUserDto implements ResponseUser {
  id: string;

  login: string;

  @Exclude()
  password: string;

  version: number;

  @Transform(({ value }) => value.getTime())
  createdAt: number;

  @Transform(({ value }) => value.getTime())
  updatedAt: number;
}
