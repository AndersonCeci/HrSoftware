import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEventDto } from './dto/createEvent.dto';
import { Event } from './schema/events.schema';
import { Coordinates } from './schema/coordinates.schema';
import { Query } from 'express-serve-static-core';
import { NotificationsGateway } from 'src/notificationsGateway/notifications.gateway';
import { CreateNotificationDto } from 'src/notificationsGateway/dto/CreateNotificationDto';
import { NotificationsService } from 'src/notificationsGateway/notifications.service';
import { CoordinatesDto } from './dto/coordinates.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<Event>,
    @InjectModel(Coordinates.name) private coordinateModel: Model<Coordinates>,
    private readonly notificationsGateway: NotificationsGateway,
    private readonly notificationService: NotificationsService,
  ) {}

  async createEvent(createEventDto: CreateEventDto): Promise<Event> {
    const createdEvent = new this.eventModel(createEventDto);

    this.notificationsGateway.sendNotification(
      `A new event "${createdEvent.eventName}" has been created !`,
      createdEvent,
    );

    const createNotificationDto: CreateNotificationDto = {
      message: createdEvent.eventName,
      isRead: false,
      userId: null,
      path: `/company/events`,
    };
    await this.notificationService.createNotification(createNotificationDto);

    return createdEvent.save();
  }

  async createLocation(coordinatesDto: CoordinatesDto): Promise<Coordinates> {
    const createdEvent = new this.coordinateModel(coordinatesDto);
    return createdEvent.save();
  }

  async getCoordinates():Promise<Coordinates[]>{
    return await this.coordinateModel.find().exec()
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
        isDeleted: false,
      })
      .limit(resPerPage)
      .skip(skip)
      .exec();

    return events;
  }

  async softDeleteEventById(id: string): Promise<Event> {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    return this.eventModel
      .findByIdAndUpdate(
        id,
        { isDeleted: true, deleteDate: currentDate },
        { new: true },
      )
      .exec();
  }
}
