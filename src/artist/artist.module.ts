import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { CoreModule } from '@core/core.module';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService],
  imports: [CoreModule],
})
export class ArtistModule {}
