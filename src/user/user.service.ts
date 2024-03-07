import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { DbService } from '@core/services/db.service';
import { User } from '@models';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UserService {
  constructor(private dbService: DbService) {}

  create(createUserDto: CreateUserDto) {
    const date = new Date().getTime();
    const user: User = {
      id: uuidv4(),
      ...createUserDto,
      version: 1,
      createdAt: date,
      updatedAt: date,
    };

    this.dbService.users.add(user.id, user);
    console.table(this.dbService);
    console.dir(this.dbService.users);
    return 'This action adds a new user';
  }

  findAll() {
    const users = this.dbService.users.findMany();
    console.log(users);
    return `This action returns all user, ${users}`;
  }

  findOne(id: string) {
    const user = this.dbService.users.findOne(id);
    console.log(user);
    return `This action returns a #${id} user`;
  }

  remove(id: string) {
    this.dbService.users.delete(id);
    return `This action removes a #${id} user`;
  }

  updatePassword(id: string, { oldPassword, newPassword }: UpdatePasswordDto) {
    const user = this.dbService.users.findOne(id);
    const updatedUser = {
      ...user,
      password: newPassword,
      updatedAt: new Date().getTime(),
      version: user.version + 1,
    };
    this.dbService.users.add(id, updatedUser);
    return `This action updated Password a #${id} user`;
  }
}
