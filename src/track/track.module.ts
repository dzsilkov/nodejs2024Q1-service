import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { CoreModule } from '@core/core.module';

@Module({
  controllers: [TrackController],
  providers: [TrackService],
  imports: [CoreModule],
})
export class TrackModule {}
