import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsService } from './eventsModale.service';
import { EventsController } from './eventsModale.controller';
import { Event,EventSchema } from './schema/events.schema';
import { NotificationsGateway } from 'src/notificationsGateway/notifications.gateway';
import { NotificationsModule } from 'src/notificationsGateway/notification.module';
import { NotificationsGatewayModule } from 'src/notificationsGateway/notificationgateAway.module';
import { Coordinates, CoordinatesSchema } from './schema/coordinates.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
    MongooseModule.forFeature([
      { name: Coordinates.name, schema: CoordinatesSchema },
    ]),

    NotificationsGatewayModule,
    NotificationsModule,
  ],
  providers: [EventsService],
  controllers: [EventsController],
})
export class EventsModuleModale {}
