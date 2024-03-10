import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { CoreModule } from '@core/core.module';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService],
  imports: [CoreModule],
})
export class AlbumModule {}
