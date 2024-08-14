import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsService } from './eventsModale.service';
import { EventsController } from './eventsModale.controller';
import { Event,EventSchema } from './schema/events.schema';
import { NotificationsGateway } from 'src/notificationsGateway/notifications.gateway';
import { NotificationsModule } from 'src/notificationsGateway/notification.module';
import { NotificationsGatewayModule } from 'src/notificationsGateway/notificationgateAway.module';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
    NotificationsGatewayModule,
    NotificationsModule,
  ],
  providers: [EventsService ],
  controllers: [EventsController],
})
export class EventsModuleModale {}
