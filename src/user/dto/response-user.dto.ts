import { ResponseUser } from '@models';

export class ResponseUserDto implements ResponseUser {
  id: string;
  login: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}
