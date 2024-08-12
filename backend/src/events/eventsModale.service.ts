import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEventDto } from './dto/createEvent.dto';
import { Event } from './schema/events.schema';
import { Query } from 'express-serve-static-core';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<Event>,
  ) {}

  async createEvent(createEventDto: CreateEventDto): Promise<Event> {
    const createdEvent = new this.eventModel(createEventDto);
    return createdEvent.save();
  }

  async getEvent(query: Query): Promise<Event[]> {
    const resPerPage = 10; 
    const currentPage = Number(query.page) || 1; 
    const skip = resPerPage * (currentPage - 1);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
  
    const events = await this.eventModel
      .find({ 
        eventDate: { $gte: currentDate },
        isDeleted: false
      })
      .limit(resPerPage)
      .skip(skip)
      .exec();
  
    return events;
  }


  
  async softDeleteEventById(id: string): Promise<Event> {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    
    return this.eventModel.findByIdAndUpdate(
      id, 
      { isDeleted: true, deleteDate: currentDate }, 
      { new: true }
    ).exec();
  }
}


