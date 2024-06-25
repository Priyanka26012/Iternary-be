// itineraries/itineraries.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItinerariesService } from './itineraries.service';
import { ItinerariesController } from './itineraries.controller';
import { Itinerary, ItinerarySchema } from './schema/itineraries.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Itinerary.name, schema: ItinerarySchema }])
  ],
  providers: [ItinerariesService],
  controllers: [ItinerariesController],
})
export class ItinerariesModule {}
