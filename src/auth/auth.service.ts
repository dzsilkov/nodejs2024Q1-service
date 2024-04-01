import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@user/user.service';
import { LoginUserDto, SignupUserDto } from '@auth/dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TokenEntity } from '@auth/entities/token.entity';
import { JwtPayload, Tokens } from '@models';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(TokenEntity)
    private authRepository: Repository<TokenEntity>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async signup(signupUserDto: SignupUserDto) {
    return await this.userService.create(signupUserDto);
  }

  async login({ login, password }: LoginUserDto): Promise<Tokens> {
    const user = await this.userService.findOneByLogin(login);
    if (!user || !this.userService.comparePassword(password, user.password)) {
      throw new ForbiddenException('Incorrect login or password');
    }
    const tokens = await this.generateToken(user);
    await this.saveToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async refresh(refreshToken: string): Promise<Tokens> {
    try {
      const { token } = await this.authRepository.findOne({
        where: { token: refreshToken },
      });
      const secret = this.configService.get('JWT_SECRET_REFRESH_KEY');
      const { userId }: JwtPayload = this.jwtService.verify(token, { secret });
      const user = await this.userService.findOneById(userId);
      const tokens = await this.generateToken(user);
      await this.saveToken(user.id, tokens.refreshToken);
      return tokens;
    } catch {
      throw new ForbiddenException('Have to login or signup');
    }
  }

  async findOne(token: string) {
    const tokenEntity = await this.authRepository.findOne({
      where: { token },
    });
    if (!tokenEntity) {
      throw new ForbiddenException('Have to login or signup');
    }
    return tokenEntity;
  }

  private async generateToken({ id, login }): Promise<Tokens> {
    const payload: JwtPayload = {
      userId: id,
      login,
    };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.getRefreshToken(payload);
    return { accessToken, refreshToken };
  }

  private async saveToken(
    userId: string,
    refreshToken: string,
  ): Promise<TokenEntity> {
    const savedToken = await this.authRepository.findOne({ where: { userId } });

    if (savedToken) {
      savedToken.token = refreshToken;
      return await this.authRepository.save(savedToken);
    }

    const token = await this.authRepository.create(
      new TokenEntity({
        userId,
        token: refreshToken,
      }),
    );

    return await this.authRepository.save(token);
  }

  private getRefreshToken(payload): string {
    const expiresIn = this.configService.get('JWT_REFRESH_EXP');
    const secret = this.configService.get('JWT_SECRET_REFRESH_KEY');
    return this.jwtService.sign(payload, {
      expiresIn,
      secret,
    });
  }
}
