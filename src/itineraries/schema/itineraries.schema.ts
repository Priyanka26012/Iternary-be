// itineraries/schemas/itinerary.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AnyObject, Document, Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/users/schema/user.schema';

@Schema()
class Cover extends Document {
  @Prop({ type: MongooseSchema.Types.Mixed })
  editable?:boolean;
  @Prop({ type: MongooseSchema.Types.Number })
  margin?: number;
  @Prop({ type: MongooseSchema.Types.Mixed, nullable: true })
  logo?: any | null;
  @Prop({ type: Number })
  pricePerAdults: number;
  @Prop({ type: Number })
  pricePerKid: number;
  @Prop()
  noOfAdults?: string;

  @Prop()
  noOfKids?: string;

  @Prop()
  inclusion?: string[];

  @Prop()
  exclusion?: string[];

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

  @Prop({ type: [MongooseSchema.Types.String] })
  range?: [String, String];

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
  @Prop({ type: MongooseSchema.Types.Mixed })
  hotel?: any;

  @Prop({ type: MongooseSchema.Types.Mixed })
  totalPrice?: any;

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
  baggageText?: string;

  @Prop()
  baggageFee?: number;

  @Prop()
  ferryAvailable?: boolean;

  @Prop({ type: MongooseSchema.Types.Mixed })
  ferryAvailableTextFrom?: any[];

  @Prop()
  ferryAvailableTextTo?: string;

  @Prop()
  ferryFee?: number;
}

@Schema()
class PackedLunch {
  @Prop()
  title?: string;

  @Prop()
  enable?: boolean;

  @Prop()
  price?: number;
}

@Schema()
class Day {
  @Prop({ type: MongooseSchema.Types.Mixed })
  city?: any;
  @Prop({ type: MongooseSchema.Types.Mixed })
  hotelCity?: any;

  @Prop({ type: MongooseSchema.Types.Mixed })
  noOfRooms?: number | string;

  @Prop({ type: MongooseSchema.Types.Number })
  totalPrice?: number;

  @Prop({ type: [MongooseSchema.Types.Mixed] })
  activity?: any[];

  @Prop({ type: MongooseSchema.Types.Mixed })
  hotel?: any

  @Prop({ type: [MongooseSchema.Types.String] })
  rangeOfStay?: [String, String];

  @Prop({ type: MongooseSchema.Types.Mixed })
  typeOfRoom?: any
  @Prop({ type: Number, nullable: true })
  drivingHrs?: number | null;

  @Prop({ type: Transport })
  transport?: Transport;

  @Prop({ type: PackedLunch })
  packedLunch?: PackedLunch;

  @Prop()
  summary?: string;

  @Prop()
  activityPerson?: number;
}

@Schema()
export class Itinerary extends Document {


  @Prop({ type: Cover })
  cover?: Cover;

  @Prop({ type: [Day] })
  days?: Day[];

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name, required: true })
  createdBy: string;


}

export const ItinerarySchema = SchemaFactory.createForClass(Itinerary);