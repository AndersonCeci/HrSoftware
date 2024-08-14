import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateNotificationDto } from './dto/CreateNotificationDto';
import { Notifications } from './notification.schema';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(Notifications.name)
    private readonly notificationModel: Model<Notifications>,
  ) {}


  async getNotifications(): Promise<Notifications[]>
  {
    const notifications = this.notificationModel.find().exec();
    return notifications;
  }

  async createNotification(createNotificationDto: CreateNotificationDto) {
    const notification = new this.notificationModel(createNotificationDto);
    return notification.save();
  }

  async markAsRead(notificationId: string): Promise<Notification> {
    return this.notificationModel.findByIdAndUpdate(
      notificationId,
      { isRead: true },
      { new: true },
    );
  }

  async getUserNotifications(userId: string) {
    return this.notificationModel.find({ user: userId }).exec();
  }
}
