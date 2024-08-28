import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  HttpException,
  Param,
  Query,
} from '@nestjs/common';
import { CreateEventDto } from './dto/createEvent.dto';
import { EventsService } from './eventsModale.service';
import mongoose from 'mongoose';



@Controller('event')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  createEvent(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.createEvent(createEventDto);
  }

  @Get()
  async getEvent(@Query() query) {
    return this.eventsService.getEvent(query);
  }

  @Delete(':id')
  async softDeleteById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 404);
    return this.eventsService.softDeleteEventById(id);
  }
}
