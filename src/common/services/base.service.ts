// src/common/services/base.service.ts
import { Model, Document } from 'mongoose';
import { NotFoundException } from '@nestjs/common';
import { UserOwned } from '../interfaces/user-owned.interface';

export class BaseService<T extends Document & UserOwned> {
  constructor(private readonly model: Model<T>) {}

  async create(createDto: any, userId: string): Promise<T> {
    const createdDoc = new this.model({
      ...createDto,
      createdBy: userId,
    });
    return createdDoc.save();
  }

  async findAll(userId: string): Promise<T[]> {
    return this.model.find({ createdBy: userId }).populate('createdBy').exec();
  }

  async findOne(id: string, userId: string): Promise<T> {
    const doc = await this.model.findOne({ _id: id, createdBy: userId }).exec();
    if (!doc) {
      throw new NotFoundException(`Document with ID "${id}" not found or you don't have permission to access it.`);
    }
    return doc;
  }

  async update(id: string, updateDto: any, userId: string): Promise<T> {
    const updatedDoc = await this.model.findOneAndUpdate(
      { _id: id, createdBy: userId },
      updateDto,
      { new: true }
    ).exec();
    if (!updatedDoc) {
      throw new NotFoundException(`Document with ID "${id}" not found or you don't have permission to update it.`);
    }
    return updatedDoc;
  }

  async remove(id: string, userId: string): Promise<T> {
    const deletedDoc = await this.model.findOneAndDelete({ _id: id, createdBy: userId }).exec();
    if (!deletedDoc) {
      throw new NotFoundException(`Document with ID "${id}" not found or you don't have permission to delete it.`);
    }
    return deletedDoc;
  }
}