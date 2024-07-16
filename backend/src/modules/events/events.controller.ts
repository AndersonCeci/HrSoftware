import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CreateEventDto } from "./eventsDTO/events.dto";
import { EventsService } from "./events.service";
import { UpdateEventDto } from "./eventsDTO/updateEvents.dto";

@Controller('events')
export class EventsController {
    constructor(private readonly eventsService: EventsService) {}

    @Post()
    async createEvent(@Body() createEventDto: CreateEventDto) {
        return await this.eventsService.create(createEventDto);

    }

    @Get()
    async findAllEvents() {
        return await this.eventsService.findAll();
    }

    @Get(':id')
    async findOneEvent(@Param('id') id: string) {
        return await this.eventsService.findById(id);
    }

    @Delete(':id')
    async deleteEvent(@Param('id') id: string) {
        return await this.eventsService.delete(id);
    }

    @Put(':id')
    async updateEvent(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
        return await this.eventsService.update(id, updateEventDto);
    }

}