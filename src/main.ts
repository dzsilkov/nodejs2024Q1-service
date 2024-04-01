import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './exception-filter/http-exception-filter.class';
import * as yaml from 'yaml';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { DEFAULT_PORT, DEFAULT_SWAGGER_API_ENDPOINT } from '@shared/constants';
import { ConfigService } from '@nestjs/config';
import { MyLoggerService } from '@logger/service/logger.service';

const swaggerYamlFilePath = join(__dirname, '..', 'doc', 'api.yaml');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.enableCors();
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT', DEFAULT_PORT);

  const logger = new MyLoggerService(configService);
  app.useLogger(logger);

  app.useGlobalFilters(new HttpExceptionFilter(logger));

  const swaggerYamlFile = await readFile(swaggerYamlFilePath, 'utf8');
  const swaggerDocument = yaml.parse(swaggerYamlFile);
  const swaggerEndpoint = configService.get<string>(
    'SWAGGER_API_ENDPOINT',
    DEFAULT_SWAGGER_API_ENDPOINT,
  );
  SwaggerModule.setup(swaggerEndpoint, app, swaggerDocument);

  process.on('uncaughtException', (error) => {
    const message =
      error instanceof Error ? error.message : JSON.stringify(error);
    logger.error(`Uncaught Exception: ${message}`);
    process.exit(1);
  });

  process.on('unhandledRejection', (error) => {
    logger.error(`Unhandled Rejection: ${JSON.stringify(error)}`);
  });

  await app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
}
bootstrap();
