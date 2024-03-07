import {
  v4 as uuidv4,
  validate as uuidValidate,
  version as uuidVersion,
} from 'uuid';
import { User } from '@models';
import { CreateUserDto } from '../user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

export const uuidIsValid = (uuid: string): boolean => {
  return uuidValidate(uuid) && uuidVersion(uuid) === 4;
};

export const createUser = async ({
  login,
  password,
}: CreateUserDto): Promise<User> => {
  const hashPassword = await bcrypt.hash(password, 10);
  const date = new Date().getTime();
  return {
    id: uuidv4(),
    login,
    password: hashPassword,
    version: 1,
    createdAt: date,
    updatedAt: date,
  };
};
