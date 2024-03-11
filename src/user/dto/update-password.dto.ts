import { UpdateUserPassword } from '@models';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePasswordDto implements UpdateUserPassword {
  @IsNotEmpty()
  @IsString()
  oldPassword: string;

  @IsNotEmpty()
  @IsString()
  newPassword: string;
}
