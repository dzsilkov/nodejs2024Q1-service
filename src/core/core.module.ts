import { Module } from '@nestjs/common';
import { DbService } from '@core/services/db.service';

@Module({
  providers: [
    DbService,
    // {
    //   provide: 'DB_SERVICE',
    //   useExisting: DbService,
    // },
  ],
  exports: [DbService],
})
export class CoreModule {}
