// itineraries/itineraries.controller.ts
import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ItinerariesService } from './itineraries.service';
import { CreateItineraryDto } from './dto/create-itineraries.dto';
import { UpdateItineraryDto } from './dto/update-itineraries.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('itineraries')
@UseGuards(JwtAuthGuard)
export class ItinerariesController {
  constructor(private readonly itinerariesService: ItinerariesService) {}

  @Post()
  create(@Request() req, @Body() createItineraryDto: CreateItineraryDto) {
    return this.itinerariesService.create(createItineraryDto, req.user.userId);
  }

  @Get()
  findAll(@Request() req) {
    console.log(req.user,"<req")
    return this.itinerariesService.findAll(req.user.userId);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.itinerariesService.findOne(id, req.user.userId);
  }

  @Put(':id')
  update(@Request() req, @Param('id') id: string, @Body() updateItineraryDto: UpdateItineraryDto) {
    return this.itinerariesService.update(id, updateItineraryDto, req.user.userId);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.itinerariesService.remove(id, req.user.userId);
  }
}