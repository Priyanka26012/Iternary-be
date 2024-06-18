import { Controller, Get, Query } from '@nestjs/common';
import { RentalService } from './rental.service';

@Controller('rental')
export class RentalController {
    constructor(
        private readonly rentalService: RentalService
    ) { }

    @Get('/car')
    async fetchCar(@Query() query:{start:string,end:string}) {
        try {
            return this.rentalService.fetchCar(query.start,query.end)
        }
        catch (err) {
            throw err;
        }
    }
}
