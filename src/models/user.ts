export interface User {
  id: string; // uuid v4
  login: string;
  password: string;
  version: number; // integer number, increments on update
  createdAt: Date; // Date of creation
  updatedAt: Date; // Date of last update
}

export interface ResponseUser
  extends Omit<User, 'password' | 'createdAt' | 'updatedAt'> {
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}

export interface UpdateUserPassword {
  oldPassword: string;
  newPassword: string;
}
