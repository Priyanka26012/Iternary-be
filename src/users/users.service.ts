// users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findOne(username: string): Promise<User | undefined> {
    // Ensure password field is selected
    return this.userModel.findOne({ username }).select('+password').exec();
  }

  async create(username: string, password: string): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new this.userModel({ username, password: hashedPassword });
    return newUser.save();
  }

  async validatePassword(password: string, hash: string): Promise<boolean> {
    console.log('Password:', password);
    console.log('Hash:', hash);
    return bcrypt.compare(password, hash);
  }
}
