import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavsEntity } from '@favs/entities/favs.entity';
import { AlbumModule } from '@album/album.module';
import { ArtistModule } from '@artist/artist.module';
import { TrackModule } from '@track/track.module';
import { UserModule } from '@user/user.module';

@Module({
  controllers: [FavsController],
  providers: [FavsService],
  imports: [
    TypeOrmModule.forFeature([FavsEntity]),
    ArtistModule,
    AlbumModule,
    TrackModule,
    UserModule,
  ],
})
export class FavsModule {}
