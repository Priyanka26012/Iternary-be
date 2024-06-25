// itineraries/schemas/itinerary.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
class Cover {
  @Prop({ type: String, nullable: true })
  logo?: string | null;

  @Prop()
  noOfAdults?: number;

  @Prop()
  noOfKids?: number;

  @Prop()
  inclusion?: string;

  @Prop()
  exclusion?: string;

  @Prop()
  name?: string;

  @Prop()
  paxKidName?: string;

  @Prop()
  paxContact?: string;

  @Prop()
  paxEmail?: string;

  @Prop()
  paxAge?: string;

  @Prop()
  email?: string;

  @Prop()
  personName?: string;

  @Prop()
  paxName?: string;

  @Prop()
  number?: string;

  @Prop({ type: [Date] })
  range?: [Date | null, Date | null];

  @Prop()
  title?: string;

  @Prop()
  startDate?: string;

  @Prop()
  endDate?: string;

  @Prop()
  days?: number;

  @Prop()
  night?: number;

  @Prop({ type: [MongooseSchema.Types.Mixed] })
  carRental?: any[];
}

@Schema()
class Hotel {
  @Prop()
  totalPrice?: number;

  @Prop({ type: MongooseSchema.Types.Mixed })
  typeOfRoom?: any;

  @Prop()
  noOfRooms?: number;

  @Prop()
  bedConfiguration?: string;

  @Prop({
    type: {
      adults: Number,
      children: Number,
    },
  })
  occupancy?: { adults?: number; children?: number };
}

@Schema()
class Transport {
  @Prop()
  vehicleType?: string;

  @Prop()
  fuelType?: string;

  @Prop()
  flightAvailable?: boolean;

  @Prop()
  flightAvailableTextFrom?: string;

  @Prop()
  flightAvailableTextTo?: string;

  @Prop()
  flightFee?: number;

  @Prop()
  flightTime?: string;

  @Prop()
  ferryTime?: number;

  @Prop()
  baggageIncluded?: boolean;

  @Prop()
  ferryAvailable?: boolean;

  @Prop()
  ferryAvailableTextFrom?: string;

  @Prop()
  ferryAvailableTextTo?: string;

  @Prop()
  ferryFee?: number;
}

@Schema()
class Day {
  @Prop({ type: MongooseSchema.Types.Mixed })
  city?: any;

  @Prop({ type: [MongooseSchema.Types.Mixed] })
  activity?: any[];

  @Prop({ type: Hotel })
  hotel?: Hotel;

  @Prop({ type: Number, nullable: true })
  drivingHrs?: number | null;

  @Prop({ type: Transport })
  transport?: Transport;

  @Prop()
  summary?: string;

  @Prop()
  activityPerson?: number;
}

@Schema()
export class Itinerary extends Document {
  @Prop({ type: MongooseSchema.Types.String, ref: 'users' })
  createdBy?: string;

  @Prop({ type: Cover })
  cover?: Cover;

  @Prop({ type: [Day] })
  days?: Day[];
}

export const ItinerarySchema = SchemaFactory.createForClass(Itinerary);