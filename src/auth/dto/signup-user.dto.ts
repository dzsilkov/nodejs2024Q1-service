import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class SignupUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  login: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
