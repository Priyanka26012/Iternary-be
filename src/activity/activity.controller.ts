import { ActivityService } from './activity.service';
import { Body, Controller, Get, Query } from '@nestjs/common';

@Controller('activity')
export class ActivityController {
    constructor(
        private readonly activityService: ActivityService
    ) { }

    @Get('activities')
    async fetchActivity(@Query('city') city: string) {
        try {
            return this.activityService.getActivity(city)
        }
        catch (err) {
            throw err;
        }
    }
    @Get('activities/details')
    async fetchActivityDetails(@Query() query: {
        productURL: string,
        city: string
    }) {
        const { productURL = '', city = '' } = query;
        try {
            return this.activityService.getActivityDetails(city, productURL)
        }
        catch (err) {
            throw err;
        }
    }
}
