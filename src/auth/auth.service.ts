import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@user/user.service';
import { LoginUserDto, SignupUserDto } from '@auth/dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async signup(signupUserDto: SignupUserDto) {
    const loginExist = await this.userService.findOneByLogin(
      signupUserDto.login,
    );
    if (loginExist) {
      throw new ConflictException(
        `Login \'${signupUserDto.login}\' already exist`,
      );
    }
    return await this.userService.create(signupUserDto);
  }

  async login({ login, password }: LoginUserDto) {
    const user = await this.userService.findOneByLogin(login);
    if (!user || !this.userService.comparePassword(password, user.password)) {
      throw new ForbiddenException('Incorrect login or password');
    }
    const payload = {
      userId: user.id,
      login,
    };
    const accessToken = `Bearer ${this.jwtService.sign(payload)}`;
    const refreshToken = this.getRefreshToken(payload);
    console.log(refreshToken);
    return { accessToken };
  }

  getRefreshToken(payload) {
    return this.jwtService.sign(payload);
  }

  refresh() {
    return `This action returns a # auth`;
  }
}
