// itineraries/itineraries.controller.ts
import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, UnauthorizedException } from '@nestjs/common';
import { ItinerariesService } from './itineraries.service';
import { CreateItineraryDto } from './dto/create-itineraries.dto';
import { UpdateItineraryDto } from './dto/update-itineraries.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../common/decorators/user.decorator';

@Controller('itineraries')
@UseGuards(JwtAuthGuard)
export class ItinerariesController {
  constructor(private readonly itinerariesService: ItinerariesService) { }

  @Post()
  create(@User() user, @Body() createItineraryDto: CreateItineraryDto) {
    console.log('User object:', user); // Add this line for debugging
    if (!user || !user.userId) {
      throw new UnauthorizedException('User not authenticated');
    }
    return this.itinerariesService.create(createItineraryDto, user.userId);
  }
  @Post('upload-logo')
  async uploadLogo(@User() user, @Body() uploadLogoDto: {
    itineraryId: string;
    logo: string;
  }) {
    if (!user || !user.userId) {
      throw new UnauthorizedException('User not authenticated');
    }
    return this.itinerariesService.uploadLogo(uploadLogoDto.itineraryId, uploadLogoDto.logo, user.userId);
  }
  @Get()
  findAll(@User() user) {
    console.log(user, ">>>user")
    return this.itinerariesService.findAll(user.userId);
  }

  @Get('suggestions')
  async getSuggestions(@User() user) {
    if (!user || !user.userId) {
      throw new UnauthorizedException('User not authenticated');
    }
    return this.itinerariesService.getSuggestions(user.userId);
  }

  @Get(':id')
  findOne(@User() user, @Param('id') id: string) {
    return this.itinerariesService.findOne(id, user.userId);
  }

  @Put(':id')
  update(@User() user, @Param('id') id: string, @Body() updateItineraryDto: UpdateItineraryDto) {
    return this.itinerariesService.update(id, updateItineraryDto, user.userId);
  }

  @Delete(':id')
  remove(@User() user, @Param('id') id: string) {
    return this.itinerariesService.remove(id, user.userId);
  }


}