import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '@models';
import { DbService } from '@core/services/db.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { createUser } from '../helpers/helpers';
import { plainToInstance } from 'class-transformer';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private dbService: DbService) {}

  async create(createUserDto: CreateUserDto) {
    const user: User = await createUser(createUserDto);
    this.dbService.users.add(user.id, user);
    return plainToInstance<UserEntity, User>(UserEntity, user);
  }

  findAll() {
    const users = this.dbService.users.findMany();
    return plainToInstance<UserEntity, User[]>(UserEntity, users);
  }

  findOne(id: string) {
    const user = this.dbService.users.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
    return plainToInstance<UserEntity, User>(UserEntity, user);
  }

  remove(id: string) {
    const user = this.dbService.users.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
    this.dbService.users.delete(id);
    return `User with ${id} removed`;
  }

  async updatePassword(
    id: string,
    { oldPassword, newPassword }: UpdatePasswordDto,
  ) {
    const user = this.dbService.users.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
    const comparePassword = bcrypt.compareSync(oldPassword, user.password);

    if (!comparePassword) {
      throw new ForbiddenException('The old password is wrong');
    }
    const hashPassword = await bcrypt.hash(newPassword, 10);

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
