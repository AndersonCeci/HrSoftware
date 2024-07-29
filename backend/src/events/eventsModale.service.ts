import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEventDto } from './dto/createEvent.dto';
import { Event } from './schema/events.schema';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<Event>,
  ) {}

  async createEvent(createEventDto: CreateEventDto): Promise<Event> {
    const createdEvent = new this.eventModel(createEventDto);
    return createdEvent.save();
  }

  async getEvent(): Promise<Event[]> {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    return this.eventModel.find({ eventDate: { $gte: currentDate } }).exec();
  }
}
