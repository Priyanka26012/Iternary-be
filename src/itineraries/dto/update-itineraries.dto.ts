// itineraries/dto/update-itinerary.dto.ts
export class UpdateItineraryDto {
  createdBy: string;
  cover: {
    logo:any;
        noOfAdults: string;
    noOfKids: string;
    inclusion: any[];
    exclusion: any[];
    name: string;
    paxKidName: string;
    paxContact: string;
    paxEmail: string;
    paxAge: string;
    email: string;
    personName: string;
    paxName: string;
    number: string;
    range: [Date | null, Date | null];
    title: string;
    startDate: string;
    endDate: string;
    days: number;
    night: number;
    carRental: any[];
  };
  days: {
    city: any;
    activity: any[];
    hotel: any;
    drivingHrs: number | null;
    transport: {
      vehicleType: string;
      fuelType: string;
      flightAvailable: boolean;
      flightAvailableTextFrom: string;
      flightAvailableTextTo: string;
      flightFee: number;
      flightTime: string;
      ferryTime: number;
      baggageIncluded: boolean;
      baggageText: string;
      baggageFee: number;
      ferryAvailable: boolean;
      ferryAvailableTextFrom: any[];
      ferryAvailableTextTo: string;
      ferryFee: number;
    };
    packedLunch: {
      title: string;
      enabled: boolean;
      price: number;
    };
    summary: string;
    activityPerson: number;
  }[];
}