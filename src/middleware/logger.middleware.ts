import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { MyLoggerService } from '@logger/service/logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly loggerService: MyLoggerService) {}

  use(req: Request, res: Response, next: () => void): any {
    res.on('finish', () => {
      const { statusCode } = res;
      const { url, body, query } = req;
      const queryParams = `, query params: ${JSON.stringify(query)}`;
      const requestBody = `, body: ${JSON.stringify(body)}`;
      const message = `REQUEST: ${url}${queryParams}${requestBody}; RESPONSE: status code ${statusCode}`;

      this.loggerService.log(message);
      //
      // if (statusCode >= 500) {
      //   this.loggerService.error(message);
      // } else if (statusCode >= 400) {
      //   this.loggerService.log(message);
      // } else {
      //   this.loggerService.debug(message);
      // }
    });
    next();
  }
}
