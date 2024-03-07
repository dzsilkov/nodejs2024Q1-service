import { UpdateUserPassword } from '@models';

export class UpdatePasswordDto implements UpdateUserPassword {
  oldPassword: string;
  newPassword: string;
}
