import { ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();
const configService = new ConfigService();

const config = {
  type: 'postgres',
  host: 'localhost',
  port: configService.getOrThrow('POSTGRES_PORT'),
  database: configService.getOrThrow('POSTGRES_DB'),
  username: configService.getOrThrow('POSTGRES_USERNAME'),
  password: configService.getOrThrow('POSTGRES_PASSWORD'),
  entities: [configService.getOrThrow('POSTGRES_ENTITIES')],
  migrations: [configService.getOrThrow('POSTGRES_MIGRATIONS')],
};

export default new DataSource(config as DataSourceOptions);
