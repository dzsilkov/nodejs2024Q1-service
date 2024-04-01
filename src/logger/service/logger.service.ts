import { Injectable, LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LogWriteService } from './../service/log-write.service';
import { LOGGER_DEFAULT_LOG_LEVEL } from '@shared/constants';
import { LogLevelValues } from './../service/types';

@Injectable()
export class MyLoggerService implements LoggerService {
  private readonly logWriteService = new LogWriteService(this.configService);
  private loggerLogLevel = this.configService.get<number>(
    'LOGGER_LOG_LEVEL',
    LOGGER_DEFAULT_LOG_LEVEL,
  );
  constructor(private readonly configService: ConfigService) {}

  private async writeLog(level: LogLevelValues, message: string) {
    if (level >= this.loggerLogLevel) {
      await this.logWriteService.writeLog(level, message);
    }
  }

  log(message: string) {
    this.writeLog(LogLevelValues.LOG, message);
  }

  error(message: string) {
    this.writeLog(LogLevelValues.ERROR, message);
  }

  warn(message: string) {
    this.writeLog(LogLevelValues.WARN, message);
  }

  verbose(message: string) {
    this.writeLog(LogLevelValues.VERBOSE, message);
  }

  debug(message: string) {
    this.writeLog(LogLevelValues.DEBUG, message);
  }
}
