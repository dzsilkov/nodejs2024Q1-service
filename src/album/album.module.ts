import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { DbModule } from '@db/db.mobule';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService],
  imports: [DbModule],
})
export class AlbumModule {}
