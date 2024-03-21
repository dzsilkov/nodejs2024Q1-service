import { ConfigService } from '@nestjs/config';
import { join } from 'node:path';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';

// config();
const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  entities: ['dist/**/*.entity{.ts, .js}'],
  migrations: [join(__dirname, 'migrations', '*')],
  // host: process.env.TYPEORM_HOST,
  // port: parseInt(process.env.TYPEORM_PORT),
  // username: process.env.TYPEORM_USERNAME,
  // password: process.env.TYPEORM_PASSWORD,
  // database: process.env.TYPEORM_DATABASE,
  host: configService.get<string>('TYPEORM_HOST'),
  port: configService.get<number>('TYPEORM_PORT'),
  username: configService.get<string>('TYPEORM_USERNAME'),
  password: configService.get<string>('TYPEORM_PASSWORD'),
  database: configService.get<string>('TYPEORM_DATABASE'),
  logging: true,
});
