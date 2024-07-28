// itineraries/itineraries.service.ts
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
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
  async uploadLogo(itineraryId: string, logoBase64: string, userId: string) {
    const itinerary = await this.itineraryModel.findById(itineraryId);
    if (!itinerary) {
      throw new NotFoundException('Itinerary not found');
    }

    if (itinerary.createdBy.toString() !== userId) {
      throw new UnauthorizedException('User not authorized to modify this itinerary');
    }

    // Update the itinerary with the new logo
    itinerary.cover.logo = logoBase64;
    await itinerary.save();

    return { message: 'Logo uploaded successfully' };
  }
  async findAll(userId: string): Promise<Itinerary[]> {
    return super.findAll(userId);
  }

  async getSuggestions(userId: string): Promise<any[]> {
    const itineraries = await this.itineraryModel.find({ createdBy: userId }, { cover: 1, _id: 0 }).exec();
    const uniqueMap = new Map();
    itineraries.forEach(itinerary => {
      if (itinerary.cover && itinerary.cover.number) {
        uniqueMap.set(itinerary.cover.number.toString(), {
          ...itinerary.cover.toObject(),
          _id: itinerary.cover.number
        });
      }
    });
    return Array.from(uniqueMap.values());
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