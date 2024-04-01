import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DEFAULT_LOG_MAX_FILE_SIZE } from '@shared/constants';
import {
  appendFile,
  rename,
  stat,
  access,
  mkdir,
  constants,
} from 'node:fs/promises';
import { resolve } from 'node:path';
import { LogLevelValues } from '@logger/service/logger.service';

@Injectable()
export class LogWriteService {
  private readonly maxFileSize =
    parseInt(this.configService.get('LOG_MAX_FILE_SIZE'), 10) ||
    DEFAULT_LOG_MAX_FILE_SIZE;

  constructor(private readonly configService: ConfigService) {}

  async writeLog(level: LogLevelValues, message: string) {
    const logMessage = `${new Date().toISOString()} [${
      LogLevelValues[level]
    }] - ${message}}\n`;

    process.stdout.write(logMessage);
    await this.writeLogToFile(level, logMessage);
  }

  async writeLogToFile(level: LogLevelValues, message: string) {
    const folderPath = resolve(__dirname, '../..', 'logs');

    try {
      await access(folderPath, constants.F_OK);
    } catch (e) {
      await mkdir(folderPath);
    }

    let filePath = resolve(folderPath, `app_logs.log`);

    if (level === LogLevelValues.ERROR) {
      filePath = resolve(folderPath, `error_logs.log`);
    }

    try {
      const logSize = await this.getLogSize(filePath);

      if (logSize + message.length > this.maxFileSize * 1024) {
        const backupPath = filePath.replace(
          '.log',
          `_backup_${Date.now()}.log`,
        );
        await rename(filePath, backupPath);
      }
      await appendFile(filePath, message);
    } catch (e) {
      console.log(e);
    }
  }

  private async getLogSize(path: string): Promise<number> {
    try {
      const { size } = await stat(path);
      return size;
    } catch {
      return 0;
    }
  }
}
