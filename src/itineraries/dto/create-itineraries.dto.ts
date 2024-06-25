// itineraries/dto/create-itinerary.dto.ts

export class CreateItineraryDto {
  createdBy: string;
  cover: {
    logo: string | null;
    noOfAdults: number;
    noOfKids: number;
    inclusion: string;
    exclusion: string;
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
    hotel: {
      totalPrice: number;
      typeOfRoom: any;
      noOfRooms: number;
      bedConfiguration: string;
      occupancy: {
        adults: number;
        children: number;
      };
    };
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
      ferryAvailable: boolean;
      ferryAvailableTextFrom: string;
      ferryAvailableTextTo: string;
      ferryFee: number;
    };
    summary: string;
    activityPerson: number;
  }[];
}