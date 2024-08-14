import { CreateNotificationDto } from 'src/notificationsGateway/dto/CreateNotificationDto';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { Notifications } from './notification.schema';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  getNotifications(): Promise<Notifications[]> {
    return this.notificationsService.getNotifications();
  }

  @Post()
  createNotification(@Body() createdNotifications: CreateNotificationDto) {
    return this.notificationsService.createNotification(createdNotifications);
  }

  // @Get('user/:userId')
  // getUserNotifications(@Param('userId') userId: string) {
  //   return this.notificationsService.getUserNotifications(userId);
  // }

  // @Patch(':id/read')
  // markAsRead(@Param('id') id: string) {
  //   return this.notificationsService.markAsRead(id);
  // }
}
