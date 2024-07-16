import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { EventsController } from "./events.controller";
import { EventsService } from "./events.service";
import { Events } from "./schema/events.schema";
import { EventsSchema } from "./schema/events.schema";


@Module({
    imports: [
        MongooseModule.forFeature([{ name: Events.name, schema: EventsSchema }]),
    ],
    controllers: [EventsController],
    providers: [EventsService],
})

export class EventsModule {}