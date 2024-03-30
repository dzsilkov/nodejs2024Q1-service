import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@user/user.service';
import { LoginUserDto, SignupUserDto } from '@auth/dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TokenEntity } from '@auth/entities/token.entity';
import { Request } from 'express';
import { JwtPayload } from '@models';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(TokenEntity)
    private authRepository: Repository<TokenEntity>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async signup(signupUserDto: SignupUserDto) {
    // const loginExist = await this.userService.findOneByLogin(
    //   signupUserDto.login,
    // );
    // if (loginExist) {
    //   throw new ConflictException(
    //     `Login \'${signupUserDto.login}\' already exist`,
    //   );
    // }
    const user = await this.userService.create(signupUserDto);
    const tokens = await this.generateToken(user);
    return { accessToken: tokens.accessToken };
  }

  async login({ login, password }: LoginUserDto) {
    const user = await this.userService.findOneByLogin(login);
    if (!user || !this.userService.comparePassword(password, user.password)) {
      throw new ForbiddenException('Incorrect login or password');
    }
    return this.generateToken(user);
  }

  private async generateToken({ id, login }) {
    const payload: JwtPayload = {
      userId: id,
      login,
    };
    const accessToken = `Bearer ${this.jwtService.sign(payload)}`;
    const refreshToken = this.getRefreshToken(payload);

    await this.authRepository.save(
      new TokenEntity({
        userId: id,
        token: refreshToken,
      }),
    );

    console.log(this.jwtService.decode(this.jwtService.sign(payload)));
    console.log(this.jwtService.decode(refreshToken));
    return { accessToken, refreshToken };
  }

  private getRefreshToken(payload) {
    return this.jwtService.sign(payload);
  }

  async refresh(refreshToken: string) {
    const token = await this.authRepository.findOne({
      where: { token: refreshToken },
    });
    if (!token) {
      throw new ForbiddenException('Have to login or signup');
    }
    await this.authRepository.delete(token.id);
    const user = await this.userService.findOneById(token.userId);
    return this.generateToken(user);
  }

  extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
