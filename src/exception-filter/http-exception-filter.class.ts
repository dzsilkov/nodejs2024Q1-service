import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  ForbiddenException,
  HttpException,
  HttpExceptionBody,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { MyLoggerService } from '@logger/service/logger.service';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly loggerService: MyLoggerService) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    let body: HttpExceptionBody;

    switch (true) {
      case exception instanceof HttpException:
        body = {
          error: exception.name,
          statusCode: exception.getStatus(),
          message: exception.message,
        };

        break;

      case exception instanceof ForbiddenException:
        body = {
          error: exception.name,
          statusCode: exception.getStatus(),
          message: exception.message,
        };

        break;

      case exception instanceof UnauthorizedException:
        body = {
          error: exception.name,
          statusCode: exception.getStatus(),
          message: exception.message,
        };

        break;

      case exception instanceof BadRequestException:
        body = {
          error: exception.name,
          statusCode: exception.getStatus(),
          message: exception.message,
        };

        break;

      default:
        body = {
          error: exception.name,
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: exception.message,
        };
    }
    const { error, statusCode, message } = body;
    const logMessage = `Exception: ${error} HTTP ${statusCode} Message: ${message}`;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (statusCode >= 500) {
      this.loggerService.error(logMessage);
    } else if (statusCode >= 400) {
      this.loggerService.log(logMessage);
    } else {
      this.loggerService.debug(logMessage);
    }

    response.status(statusCode).json(body);
  }
}
