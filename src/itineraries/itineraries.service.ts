// itineraries/itineraries.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Itinerary } from './schema/itineraries.schema'
import { CreateItineraryDto } from './dto/create-itineraries.dto'
import { UpdateItineraryDto } from './dto/update-itineraries.dto'

@Injectable()
export class ItinerariesService {
  constructor(
    @InjectModel(Itinerary.name) private itineraryModel: Model<Itinerary>
  ) {}

  async create(createItineraryDto: CreateItineraryDto, userId: string): Promise<Itinerary> {
    const createdItinerary = new this.itineraryModel({
      ...createItineraryDto,
      createdBy: userId
    });
    return createdItinerary.save();
  }

  async findAll(): Promise<Itinerary[]> {
    return this.itineraryModel.find().exec();
  }

  async findOne(id: string, userId: string): Promise<Itinerary> {
    const itinerary = await this.itineraryModel.findOne({ _id: id, createdBy: userId }).exec();
    if (!itinerary) {
      throw new NotFoundException(`Itinerary with ID "${id}" not found or you don't have permission to access it.`);
    }
    return itinerary;
  }

  async update(id: string, updateItineraryDto: UpdateItineraryDto, userId: string): Promise<Itinerary> {
    const updatedItinerary = await this.itineraryModel.findOneAndUpdate(
      { _id: id, createdBy: userId },
      updateItineraryDto,
      { new: true }
    ).exec();
    if (!updatedItinerary) {
      throw new NotFoundException(`Itinerary with ID "${id}" not found or you don't have permission to update it.`);
    }
    return updatedItinerary;
  }

  async remove(id: string, userId: string): Promise<any> {
    const deletedItinerary = await this.itineraryModel.findOneAndDelete({ _id: id, createdBy: userId }).exec();
    if (!deletedItinerary) {
      throw new NotFoundException(`Itinerary with ID "${id}" not found or you don't have permission to delete it.`);
    }
    return deletedItinerary;
  }
}