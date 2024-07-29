import { Controller, Post, Body,Get } from '@nestjs/common';
import { CreateEventDto } from './dto/createEvent.dto';
import { EventsService } from './eventsModale.service';

@Controller('event')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  createEvent(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.createEvent(createEventDto);
  }

  @Get()
  async getEvent(){
    return this.eventsService.getEvent()
  }
}
