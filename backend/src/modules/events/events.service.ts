import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './eventsDTO/events.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Events } from './schema/events.schema';
import { Model } from 'mongoose';
import { UpdateEventDto } from './eventsDTO/updateEvents.dto';
import { Employee } from 'src/employee/schema/employe.schema';
import { NotificationsService } from 'src/notificationsGateway/notifications.service';
import { Types } from 'mongoose';
import { NotificationStatus } from 'src/notificationsGateway/notification.schema';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Events.name) private eventsModel: Model<Events>,
    @InjectModel(Employee.name) private employeeModel: Model<Employee>,
    private readonly notificationService: NotificationsService,
  ) {}
  async create(createEventDto: CreateEventDto): Promise<Events> {
    try {
      const { creatorId, invitees, ...eventData } = createEventDto;
      const user = await this.employeeModel.findById(creatorId);

      if (!user) {
        throw new Error('User not found');
      }

      const sanitizedInvitees = invitees && invitees.length > 0 ? invitees : [];
      console.log(sanitizedInvitees, 'sanitizedInvitees');

      const inviteeUsers = await this.employeeModel.find({
        _id: { $in: sanitizedInvitees },
      });

      if (inviteeUsers.length !== sanitizedInvitees.length) {
        throw new Error('Some invitees not found');
      }

      const createdEvent = new this.eventsModel({
        ...eventData,
        creator: user._id,
        invitees: sanitizedInvitees,
      });

      const savedEvent = await createdEvent.save();
      for (const invitee of inviteeUsers) {
        await this.notificationService.createNotification({
          userId: invitee._id as unknown as Types.ObjectId,
          message: `You have been invited to the event: ${savedEvent.title}`,
          path: `/personal-calendar`,
          status: NotificationStatus.NOTIFICATION,
        });
      }

      return savedEvent;
    } catch (error) {
      console.error('Error creating event:', error);
      throw new Error('Error creating event: ' + error.message);
    }
  }

  async findAll(): Promise<Events[]> {
    return this.eventsModel.find({ isDeleted: false }).exec();
  }

  async findById(id: string): Promise<Events> {
    return this.eventsModel.findById(id).exec();
  }

  async findByCreatorId(creatorId: string): Promise<Events[]> {
    return this.eventsModel.find({ creator: creatorId }).exec();
  }

  async findByInviteeId(inviteesId: string): Promise<Events[]> {
    return this.eventsModel.find({ invitees: inviteesId }).exec();
  }

  async softDeleteEventById(id: string): Promise<Event> {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    return this.eventsModel.findByIdAndUpdate(
      id,
      { isDeleted: true, deleteDate: currentDate },
      { new: true },
    );
  }

  async update(id: string, updateEventDto: UpdateEventDto): Promise<Events> {
    return this.eventsModel
      .findByIdAndUpdate(id, updateEventDto, { new: true })
      .exec();
  }
}
