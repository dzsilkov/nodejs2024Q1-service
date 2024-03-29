import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '@user/user.module';
import { jwtModuleAsyncOptions } from '@auth/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenEntity } from '@auth/entities/token.entity';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    PassportModule,
    JwtModule.registerAsync(jwtModuleAsyncOptions()),
    UserModule,
    TypeOrmModule.forFeature([TokenEntity]),
  ],
})
export class AuthModule {}
