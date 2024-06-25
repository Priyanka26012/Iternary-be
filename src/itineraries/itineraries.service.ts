// itineraries/itineraries.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Itinerary } from './schema/itineraries.schema'
import { CreateItineraryDto } from './dto/create-itineraries.dto'
import { UpdateItineraryDto } from './dto/update-itineraries.dto'
import { BaseService } from '../common/services/base.service';

@Injectable()
export class ItinerariesService extends BaseService<Itinerary> {
  constructor(
    @InjectModel(Itinerary.name) private itineraryModel: Model<Itinerary>
  ) {
    super(itineraryModel);
  }

 
  async create(createItineraryDto: CreateItineraryDto, userId: string): Promise<Itinerary> {
    const createdItinerary = new this.itineraryModel({
      ...createItineraryDto,
      createdBy: userId
    });
    return createdItinerary.save();
  }

  async findAll(userId: string): Promise<Itinerary[]> {
    return super.findAll(userId);
  }

  async findOne(id: string, userId: string): Promise<Itinerary> {
    return super.findOne(id, userId);
  }

  async update(id: string, updateItineraryDto: UpdateItineraryDto, userId: string): Promise<Itinerary> {
    return super.update(id, updateItineraryDto, userId);
  }

  async remove(id: string, userId: string): Promise<Itinerary> {
    return super.remove(id, userId);
  }

  
  async findByDateRange(startDate: Date, endDate: Date, userId: string): Promise<Itinerary[]> {
    return this.itineraryModel.find({
      createdBy: userId,
      'days.date': { $gte: startDate, $lte: endDate }
    }).exec();
  }
}