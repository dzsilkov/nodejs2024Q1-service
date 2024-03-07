import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common';

export class NotValidUuidException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
