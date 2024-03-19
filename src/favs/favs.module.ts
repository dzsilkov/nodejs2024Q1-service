import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [FavsController],
  providers: [FavsService],
  imports: [TypeOrmModule.forFeature([])],
})
export class FavsModule {}
