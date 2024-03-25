import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow('POSTGRES_HOST'),
        port: configService.getOrThrow('POSTGRES_INNER_PORT'),
        database: configService.getOrThrow('POSTGRES_DB'),
        username: configService.getOrThrow('POSTGRES_USERNAME'),
        password: configService.getOrThrow('POSTGRES_PASSWORD'),
        synchronize: configService.getOrThrow('POSTGRES_SYNCHRONIZE'),
        autoLoadEntities: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
