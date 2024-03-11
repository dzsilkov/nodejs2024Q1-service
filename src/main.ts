import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './errors/http-exception-filter.class';
import * as yaml from 'yaml';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { DEFAULT_PORT, SWAGGER_API_ENDPOINT } from '@shared/constants';

const swaggerYamlFilePath = join(__dirname, '..', 'doc', 'api.yaml');

async function bootstrap() {
  const PORT = process.env.PORT || DEFAULT_PORT;
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  const swaggerYamlFile = readFileSync(swaggerYamlFilePath, 'utf8');
  const swaggerDocument = yaml.parse(swaggerYamlFile);

  SwaggerModule.setup(SWAGGER_API_ENDPOINT, app, swaggerDocument);

  await app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
}
bootstrap();
