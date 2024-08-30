import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  HttpException,
  Param,
  Query,
  Patch,
  BadRequestException,
} from '@nestjs/common';
import { CreateEventDto } from './dto/createEvent.dto';
import { EventsService } from './eventsModale.service';
import mongoose, { Types } from 'mongoose';
import { AssignEmployeeDto } from './dto/assignEmployee.dto';




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

  @Patch('assign/:id')
  async assignEmployee(
    @Param('id') id: string,
    @Body() assignEmployeeDto: AssignEmployeeDto,
  ) {
    
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid event ID');
    }

    
    if (!Types.ObjectId.isValid(assignEmployeeDto.joinEmployee)) {
      throw new BadRequestException('Invalid joinEmployee ID');
    }

    return this.eventsService.assignEmployee(
      id,
      assignEmployeeDto.joinEmployee,
     
    );
  }

  @Delete(':id')
  async softDeleteById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 404);
    return this.eventsService.softDeleteEventById(id);
  }
}
