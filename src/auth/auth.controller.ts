import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  BadRequestException,
  Res,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { Public } from '@shared/decorators';
import { AuthService } from './auth.service';
import { LoginUserDto, RefreshTokenDto, SignupUserDto } from './dto';

@Public()
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
    const tokens = await this.authService.login(loginUserDto);
    if (!tokens) {
      new BadRequestException(
        'Bad request. Body does not contain required fields or data is incorrect',
      );
    }
    return tokens;
  }

  @Post('refresh')
  async refresh(
    @Body() { refreshToken }: RefreshTokenDto,
    @Res() res: Response,
  ) {
    if (!refreshToken) {
      throw new UnauthorizedException();
    }
    const tokens = await this.authService.refresh(refreshToken);
    res.status(HttpStatus.OK).json(tokens);
  }
}
