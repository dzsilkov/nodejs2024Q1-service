import { Module } from '@nestjs/common';
import { MyLoggerService } from './service/logger.service';
import { LogWriteService } from '@logger/service/log-write.service';

@Module({
  providers: [MyLoggerService, LogWriteService],
  exports: [MyLoggerService],
})
export class LoggerModule {}
