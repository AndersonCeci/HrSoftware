import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsService } from './eventsModale.service';
import { EventsController } from './eventsModale.controller';
import { Event, EventSchema } from './schema/events.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
  ],
  providers: [EventsService],
  controllers: [EventsController],
})
export class EventsModuleModale {}
