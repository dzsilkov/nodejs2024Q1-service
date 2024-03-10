import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { SharedModule } from '@shared/shared.module';

@Module({
  controllers: [FavsController],
  providers: [FavsService],
  imports: [SharedModule],
})
export class FavsModule {}
