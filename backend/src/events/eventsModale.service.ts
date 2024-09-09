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

  async assignEmployee(eventID: string, joinEmployee: string): Promise<any> {
    const joinEmploy = await this.eventModel.findByIdAndUpdate(
      eventID,
      {
        $push: { eventParticipants: joinEmployee },
      },
      { new: true },
    );
    const events = await this.eventModel.aggregate([
      {
        $match: { isDeleted: false },
      },
      {
        $addFields: {
          eventParticipants: {
            $map: {
              input: '$eventParticipants',
              as: 'participantId',
              in: {
                $convert: {
                  input: '$$participantId',
                  to: 'objectId',
                  onError: '$$participantId',
                  onNull: '$$participantId',
                },
              },
            },
          },
        },
      },
      {
        $lookup: {
          from: 'employees',
          localField: 'eventParticipants',
          foreignField: '_id',
          as: 'eventParticipants',
        },
      },
      {
        $addFields: {
          eventParticipants: {
            $map: {
              input: '$eventParticipants',
              as: 'participant',
              in: {
                _id: '$$participant._id',
                fullName: '$$participant.fullName',
              },
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          eventName: 1,
          eventDescription: 1,
          eventDate: {
            $dateToString: {
              format: '%Y-%m-%d',
              date: '$eventDate',
            },
          },
          eventEndDate: {
            $dateToString: {
              format: '%Y-%m-%d',
              date: '$eventEndDate',
            },
          },
          eventStartTime: 1,
          eventEndTime: 1,
          location: 1,
          eventParticipants: 1,
          images: 1,
          isDeleted: 1,
          __v: 1,
        },
      },
      {
        $sort: { eventDate: 1 },
      },

      { $skip: 10 },
      { $limit: 10 },
    ]);

    return events;
  }

  async populateEmployee(
    eventID: string,
    joinEmployee: string,
  ): Promise<Event> {
    const joinEmploy = this.eventModel.findByIdAndUpdate(eventID, {
      $push: { eventParticipants: joinEmployee },
    });
    const ok = await this.eventModel.findById(eventID).populate('joinEmploy');
    return ok;
  }

  async checkParticipantType() {
    const event = await this.eventModel.findOne({ eventName: 'hockey' });
    console.log(typeof event.eventParticipants[0]);
    return event;
  }

  async unassignAllEmployeesFromAllEvents() {
    const result = await this.eventModel
      .updateMany(
        {},
        {
          $set: { eventParticipants: [] },
        },
      )
      .exec();
  }

  // async getEvent(query: Query): Promise<Event[]> {
  //   const resPerPage = 10;
  //   const currentPage = Number(query.page) || 1;
  //   const skip = resPerPage * (currentPage - 1);
  //   const currentDate = new Date();
  //   currentDate.setHours(0, 0, 0, 0);

  //   const events = await this.eventModel
  //     .find({
  //       eventDate: { $gte: currentDate },
  //       isDeleted: false,
  //     })
  //     .limit(resPerPage)
  //     .skip(skip)
  //     .exec();

  //   return events;
  // }

  async findAll(): Promise<Event[]> {
    const events = await this.eventModel.aggregate([
      {
        $match: { isDeleted: false },
      },
      {
        $addFields: {
          eventParticipants: {
            $map: {
              input: '$eventParticipants',
              as: 'participantId',
              in: {
                $convert: {
                  input: '$$participantId',
                  to: 'objectId',
                  onError: '$$participantId',
                  onNull: '$$participantId',
                },
              },
            },
          },
        },
      },
      {
        $lookup: {
          from: 'employees',
          localField: 'eventParticipants',
          foreignField: '_id',
          as: 'eventParticipants',
        },
      },
      {
        $addFields: {
          eventParticipants: {
            $map: {
              input: '$eventParticipants',
              as: 'participant',
              in: {
                _id: '$$participant._id',
                fullName: '$$participant.fullName',
              },
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          eventName: 1,
          eventDescription: 1,
          eventDate: {
            $dateToString: {
              format: '%Y-%m-%d',
              date: '$eventDate',
            },
          },
          eventEndDate: {
            $dateToString: {
              format: '%Y-%m-%d',
              date: '$eventEndDate',
            },
          },
          eventStartTime: 1,
          eventEndTime: 1,
          location: 1,
          eventParticipants: 1,
          images: 1,
          isDeleted: 1,
          __v: 1,
        },
      },
      {
        $sort: { eventDate: 1 },
      },

      { $skip: 10 },
      { $limit: 10 },
    ]);

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
