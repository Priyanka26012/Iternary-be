import { Body, Controller, Get, Query } from '@nestjs/common';
import { HotelService } from './hotel.service';

@Controller('hotel')
export class HotelController {
    constructor(
        private readonly hotelServices: HotelService
    ) { }

    @Get('city')
    async getCity() {
        return this.hotelServices.fetchCity();
    }

    @Get('hotelList')
    async getHotelListByCode(@Query('cityCode') cityCode: string) {
        return this.hotelServices.fetchHotelByCode(cityCode);
    }
}
