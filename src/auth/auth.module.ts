import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '@user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from '@logger/logger.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { jwtModuleAsyncOptions } from './config';
import { TokenEntity } from './entities/token.entity';
import { strategies } from './strategies';
import { guards } from './guards';

@Module({
  controllers: [AuthController],
  providers: [AuthService, ...strategies, ...guards],
  imports: [
    LoggerModule,
    PassportModule,
    JwtModule.registerAsync(jwtModuleAsyncOptions()),
    UserModule,
    TypeOrmModule.forFeature([TokenEntity]),
  ],
})
export class AuthModule {}
