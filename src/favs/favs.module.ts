import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { DbModule } from '@db/db.mobule';

@Module({
  controllers: [FavsController],
  providers: [FavsService],
  imports: [DbModule],
})
export class FavsModule {}
