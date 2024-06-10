import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HotelService } from './hotel/hotel.service';
import { HotelController } from './hotel/hotel.controller';
import { HotelModule } from './hotel/hotel.module';
import { ActivityModule } from './activity/activity.module';

@Module({
  imports: [HotelModule, ActivityModule],
  controllers: [AppController, HotelController],
  providers: [AppService, HotelService],
})
export class AppModule {}
