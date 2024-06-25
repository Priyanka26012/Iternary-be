// itineraries/dto/create-itinerary.dto.ts
export class CreateItineraryDto {
   name: string;
   phone: string;
   days: { hotel: string; activities: string[] }[];
  // createdBy: string;
}