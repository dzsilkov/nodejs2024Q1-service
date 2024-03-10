import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { SharedModule } from '@shared/shared.module';

@Module({
  controllers: [TrackController],
  providers: [TrackService],
  imports: [SharedModule],
})
export class TrackModule {}
