import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from '@album/entities/album.entity';
import { TrackEntity } from '@track/entities/track.entity';
import { ArtistEntity } from '@artist/entities/artist.entity';

@Module({
  controllers: [FavsController],
  providers: [FavsService],
  imports: [TypeOrmModule.forFeature([ArtistEntity, AlbumEntity, TrackEntity])],
})
export class FavsModule {}
