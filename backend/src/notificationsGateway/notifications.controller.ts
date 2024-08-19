import { CreateNotificationDto } from 'src/notificationsGateway/dto/CreateNotificationDto';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { Notifications } from './notification.schema';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  getNotifications ( @Query( 'userId' ) userId?: string ): Promise<Notifications[]>
  {
    const userNotifications =
      this.notificationsService.getNotificationsByUser( userId );
    console.log(userNotifications, 'userNotificatios')
    return userNotifications;
  }

  // @Get('/:userId')
  // getNotifications(@Query('userId') userId?: string): Promise<Notifications[]> {
  //   console.log(userId, 'userIDDD');
  //   if (userId) {
  //     const userNotifications =
  //       // this.notificationsService.getUserNotifications(userId) &&
  //       this.notificationsService.getNotifications();
  //     return userNotifications;
  //   }
  // }

  @Post()
  createNotification(@Body() createdNotifications: CreateNotificationDto) {
    return this.notificationsService.createNotification(createdNotifications);
  }

  // @Get('/:userId')
  // getUserNotifications(@Param('userId') userId: string) {
  //   return this.notificationsService.getUserNotifications(userId);
  // }

  @Patch(':id/read')
  markAsRead(@Param('id') id: string) {
    return this.notificationsService.markAsRead(id);
  }
}
