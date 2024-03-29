import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto, SignupUserDto } from '@auth/dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(
    @Body(
      new ValidationPipe({
        exceptionFactory: () =>
          new BadRequestException(
            'Bad request. Body does not contain required fields or data is incorrect',
          ),
      }),
    )
    signupUserDto: SignupUserDto,
  ) {
    return this.authService.signup(signupUserDto);
  }

  @Post('login')
  async login(
    @Body(
      new ValidationPipe({
        exceptionFactory: () =>
          new BadRequestException(
            'Bad request. Body does not contain required fields or data is incorrect',
          ),
      }),
    )
    loginUserDto: LoginUserDto,
  ) {
    const token = await this.authService.login(loginUserDto);
    if (!token) {
      new BadRequestException(
        'Bad request. Body does not contain required fields or data is incorrect',
      );
    }
    return token;
  }

  @Post('refresh')
  refresh() {
    return this.authService.refresh();
  }
}
