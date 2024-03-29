import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { plainToInstance } from 'class-transformer';
import { UserEntity } from './entities/user.entity';
import { HASH_SALT_OF_ROUNDS } from '@shared/constants';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResponseUserDto } from '@user/dto/response-user.dto';

@Injectable()
export class UserService {
  protected _userId = 'f042c92f-8f88-4839-ad13-a7f690a16fa1';
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  getUserId() {
    return this._userId;
  }

  async create(createUserDto: CreateUserDto) {
    const hashPassword = this.hashPassword(createUserDto.password);

    const createUser = this.userRepository.create({
      ...createUserDto,
      password: hashPassword,
    });
    const user = await this.userRepository.save(createUser);
    return plainToInstance<ResponseUserDto, CreateUserDto>(
      ResponseUserDto,
      user,
    );
  }

  async findAll() {
    const users = await this.userRepository.find();
    return plainToInstance<ResponseUserDto, UserEntity[]>(
      ResponseUserDto,
      users,
    );
  }

  async findOneById(userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return plainToInstance<ResponseUserDto, UserEntity>(ResponseUserDto, user);
  }

  async findOneByLogin(login: string) {
    const user = await this.userRepository.findOne({ where: { login } });
    if (!user) {
      throw new NotFoundException(`User with login ${login} not found`);
    }
    return user;
    // return plainToInstance<ResponseUserDto, UserEntity>(ResponseUserDto, user);
  }

  async remove(userId: string) {
    const result = await this.userRepository.delete(userId);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return `User with ${userId} removed`;
  }

  async updatePassword(
    userId: string,
    { oldPassword, newPassword }: UpdatePasswordDto,
  ) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    const comparePassword = this.comparePassword(oldPassword, user.password);

    if (!comparePassword) {
      throw new ForbiddenException('The old password is wrong');
    }
    const hashPassword = this.hashPassword(newPassword);
    const updatedUser = await this.userRepository.save({
      ...user,
      password: hashPassword,
    });
    return plainToInstance<ResponseUserDto, UserEntity>(
      ResponseUserDto,
      updatedUser,
    );
  }

  private hashPassword(password: string): string {
    return hashSync(password, genSaltSync(HASH_SALT_OF_ROUNDS));
  }

  comparePassword(password: string, passwordHash: string): boolean {
    return compareSync(password, passwordHash);
  }
}
