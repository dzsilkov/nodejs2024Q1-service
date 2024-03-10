import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { SharedModule } from '@shared/shared.module';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService],
  imports: [SharedModule],
})
export class ArtistModule {}
