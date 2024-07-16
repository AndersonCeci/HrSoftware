import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as  mongoose from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) 
    private userModel: mongoose.Model<User>
  ) {}

  async create(user: User): Promise<User> {
    const newUser = await this.userModel.create(user);
    return newUser;
  }

  async getAllUsers(): Promise<User[]>{
    const result= await this.userModel.find();
    return result
  }

  async deleteUser(id: String):Promise<User>{
    return await this.userModel.findByIdAndDelete(id);
  }

async searchByName(name : string): Promise<User[]>{
  const users= await this.userModel.find({
        name:{$regex:new RegExp(name,"i")},
    })
  if(!users){
    throw new NotFoundException("User not found!")
  }else{
    return users;
  }
}
}
