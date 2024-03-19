import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { compareSync, hash } from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { plainToInstance } from 'class-transformer';
import { UserEntity } from './entities/user.entity';
import { HASH_SALT_OF_ROUNDS } from '@shared/constants';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hashPassword = await hash(
      createUserDto.password,
      HASH_SALT_OF_ROUNDS,
    );

    const createUser = this.userRepository.create({
      ...createUserDto,
      password: hashPassword,
    });
    const user = await this.userRepository.save(createUser);
    return plainToInstance<UserEntity, CreateUserDto>(UserEntity, user);
  }

  async findAll() {
    const users = await this.userRepository.find();
    return plainToInstance<UserEntity, UserEntity[]>(UserEntity, users);
  }

  async findOne(userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return plainToInstance<UserEntity, UserEntity>(UserEntity, user);
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
    const comparePassword = compareSync(oldPassword, user.password);

    if (!comparePassword) {
      throw new ForbiddenException('The old password is wrong');
    }
    const hashPassword = await hash(newPassword, HASH_SALT_OF_ROUNDS);
    const updatedUser = await this.userRepository.save({
      ...user,
      password: hashPassword,
    });
    return plainToInstance<UserEntity, UserEntity>(UserEntity, updatedUser);
  }
}
