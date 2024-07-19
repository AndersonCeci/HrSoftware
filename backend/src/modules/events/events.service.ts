import { Injectable } from "@nestjs/common";
import { CreateEventDto } from "./eventsDTO/events.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Events } from "./schema/events.schema";
import { Model } from "mongoose";
import { UpdateEventDto } from "./eventsDTO/updateEvents.dto";
import { User } from "src/users/schemas/user.schema";


@Injectable()
export class EventsService { 
    constructor(@InjectModel(Events.name) private eventsModel: Model<Events>,
                @InjectModel(User.name) private userModel: Model<User>
) {}

        async create (CreateEventDto: CreateEventDto): Promise<Events> {
            try{
                const { creatorId, ...eventData } = CreateEventDto;
                const user = await this.userModel.findById(creatorId);

                if(!user){
                    throw new Error('User not found');
                }

                
            const createdEvent = new this.eventsModel({
                ...eventData,
                creator: user._id,
            });
            console.log(createdEvent);  //for testing purpose only, remove before production
            return createdEvent.save();
            } catch (error) {
                throw new Error('Error creating event');
            }

        }

    async findAll(): Promise<Events[]> {
        return this.eventsModel.find().exec();
    }

    async findById(id: string): Promise<Events> {
        return this.eventsModel.findById(id).exec();
    }
    
    async findByCreatorId(creatorId: string): Promise<Events[]> {
        return this.eventsModel.find({ creator: creatorId }).exec();
    }

    async delete(id: string): Promise<Events> {
        return this.eventsModel.findByIdAndDelete(id).exec();
    }

    async update(id: string, updateEventDto: UpdateEventDto): Promise<Events> {
        return this.eventsModel.findByIdAndUpdate(id, updateEventDto, {new: true}).exec();
    }
}