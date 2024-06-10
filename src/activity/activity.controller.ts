import { ActivityService } from './activity.service';
import { Body, Controller, Get, Query } from '@nestjs/common';

@Controller('activity')
export class ActivityController {
    constructor(
        private readonly activityService: ActivityService
    ) { }

    @Get('activities')
    async fetchActivity() {
        try{
            return this.activityService.getActivity()
        }
        catch(err){
            throw err;
        }
    }
}
