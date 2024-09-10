import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateEventDto } from './dto/createEvent.dto';
import { Event } from './schema/events.schema';
import { Query } from 'express-serve-static-core';
import { NotificationsGateway } from 'src/notificationsGateway/notifications.gateway';
import { CreateNotificationDto } from 'src/notificationsGateway/dto/CreateNotificationDto';
import { NotificationsService } from 'src/notificationsGateway/notifications.service';
import { AssignEmployeeDto } from './dto/assignEmployee.dto';
import { Employee } from 'src/employee/schema/employe.schema';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<Event>,
    @InjectModel(Employee.name) private employeeModel: Model<Employee>,
    private readonly notificationsGateway: NotificationsGateway,
    private readonly notificationService: NotificationsService,
  ) {}

  async createEvent(createEventDto: CreateEventDto): Promise<Event> {
    const event = this.eventModel.create(createEventDto);
    return event;
  }

  async assignEmployee(eventID: string, joinEmployee: string): Promise<Event> {
    const joinEmploy = this.eventModel.findByIdAndUpdate(eventID, {
      $push: { eventParticipants: joinEmployee },
    });
    return joinEmploy;
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
