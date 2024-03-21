import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistEntity } from '@artist/entities/artist.entity';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService],
  imports: [TypeOrmModule.forFeature([ArtistEntity])],
  exports: [ArtistService],
})
export class ArtistModule {}
