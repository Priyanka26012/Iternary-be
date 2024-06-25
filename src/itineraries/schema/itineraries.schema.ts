// itineraries/schemas/itinerary.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

class Day {
  @Prop({ required: true })
  hotel: string;

  @Prop({ required: true })
  activities: string[];
}

@Schema()
export class Itinerary extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ type: [Day], required: true })
  days: Day[];

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'users' })
  createdBy: string;
}

export const ItinerarySchema = SchemaFactory.createForClass(Itinerary);