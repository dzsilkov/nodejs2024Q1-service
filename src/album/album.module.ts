import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { SharedModule } from '@shared/shared.module';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService],
  imports: [SharedModule],
})
export class AlbumModule {}
