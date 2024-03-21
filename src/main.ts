import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './errors/http-exception-filter.class';
import * as yaml from 'yaml';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { DEFAULT_PORT, SWAGGER_API_ENDPOINT } from '@shared/constants';
import { ConfigService } from '@nestjs/config';

const swaggerYamlFilePath = join(__dirname, '..', '..', 'doc', 'api.yaml');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT') ?? DEFAULT_PORT;
  app.useGlobalFilters(new HttpExceptionFilter());
  const swaggerYamlFile = await readFile(swaggerYamlFilePath, 'utf8');
  const swaggerDocument = yaml.parse(swaggerYamlFile);

  SwaggerModule.setup(SWAGGER_API_ENDPOINT, app, swaggerDocument);
  await app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
}
bootstrap();
