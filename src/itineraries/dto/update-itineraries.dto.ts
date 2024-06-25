// itineraries/dto/update-itinerary.dto.ts
export class UpdateItineraryDto {
     name?: string;
     phone?: string;
     days?: { hotel: string; activities: string[] }[];
  }
  