import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const SWAGGER_API_TITLE = 'Home Library Service';
const SWAGGER_API_DESCRIPTION = 'Home music library service';
const SWAGGER_API_VERSION = '1.0.0';
const SWAGGER_API_ENDPOINT = 'doc';

async function bootstrap() {
  const PORT = process.env.PORT || 4000;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle(SWAGGER_API_TITLE)
    .setDescription(SWAGGER_API_DESCRIPTION)
    .setVersion(SWAGGER_API_VERSION)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(SWAGGER_API_ENDPOINT, app, document);

  await app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
}
bootstrap();
