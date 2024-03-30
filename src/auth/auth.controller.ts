import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  BadRequestException,
  Res,
  HttpStatus,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto, SignupUserDto } from '@auth/dto';
import { Request, Response } from 'express';
import { Public } from '@shared/decorators';

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
    return { accessToken: tokens.accessToken };
  }

  @Post('refresh')
  async refresh(@Res() res: Response, @Req() req: Request) {
    const accessToken = this.authService.extractTokenFromHeader(req);
    if (!accessToken) {
      throw new UnauthorizedException();
    }
    const token = await this.authService.refresh(accessToken);
    res.status(HttpStatus.CREATED).json({ accessToken: token.accessToken });
  }
}
