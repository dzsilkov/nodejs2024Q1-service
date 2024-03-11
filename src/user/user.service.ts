import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '@models';
import { DbService } from '@db/db.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { plainToInstance } from 'class-transformer';
import { UserEntity } from './entities/user.entity';
import { createUser } from '@shared/helpers';
import { HASH_SALT_OF_ROUNDS } from '@shared/constants';

@Injectable()
export class UserService {
  constructor(private dbService: DbService) {}

  async create(createUserDto: CreateUserDto) {
    const user: User = await createUser(createUserDto);
    this.dbService.users.add(user.id, user);
    return plainToInstance<UserEntity, User>(UserEntity, user);
  }

  findAll() {
    const users = this.dbService.users.findAll();
    return plainToInstance<UserEntity, User[]>(UserEntity, users);
  }

  findOne(id: string) {
    const user = this.dbService.users.findOne(id);
    return plainToInstance<UserEntity, User>(UserEntity, user);
  }

  remove(id: string) {
    return this.dbService.users.delete(id);
  }

  async updatePassword(
    id: string,
    { oldPassword, newPassword }: UpdatePasswordDto,
  ) {
    const user = this.dbService.users.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    const comparePassword = bcrypt.compareSync(oldPassword, user.password);

    if (!comparePassword) {
      throw new ForbiddenException('The old password is wrong');
    }
    const hashPassword = await bcrypt.hash(newPassword, HASH_SALT_OF_ROUNDS);

    const updatedUser = {
      ...user,
      password: hashPassword,
      updatedAt: new Date().getTime(),
      version: user.version + 1,
    };
    this.dbService.users.add(id, updatedUser);
    return plainToInstance<UserEntity, User>(UserEntity, updatedUser);
  }
}
