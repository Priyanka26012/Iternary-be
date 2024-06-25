import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HotelService } from './hotel/hotel.service';
import { HotelController } from './hotel/hotel.controller';
import { HotelModule } from './hotel/hotel.module';
import { ActivityModule } from './activity/activity.module';
import { RentalModule } from './rental/rental.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ItinerariesModule } from './itineraries/itineraries.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://nitinshukla:3v12PsVCjHEJPq0W@cluster0.hwwk7wt.mongodb.net/'),HotelModule, ActivityModule, RentalModule, AuthModule, UsersModule, ItinerariesModule],
  controllers: [AppController, HotelController],
  providers: [AppService, HotelService],
})
export class AppModule {}
