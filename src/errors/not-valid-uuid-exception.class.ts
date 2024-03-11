import { ParseUUIDPipe } from '@nestjs/common';
import { ParseUUIDPipeOptions } from '@nestjs/common/pipes/parse-uuid.pipe';

export class NotValidUuidException extends ParseUUIDPipe {
  constructor(options?: ParseUUIDPipeOptions) {
    super(options);
  }
}
