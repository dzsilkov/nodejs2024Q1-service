import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { CoreModule } from '@core/core.module';

@Module({
  controllers: [FavsController],
  providers: [FavsService],
  imports: [CoreModule],
})
export class FavsModule {}
