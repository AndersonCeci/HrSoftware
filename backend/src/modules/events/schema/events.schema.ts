import { Schema, Prop, SchemaFactory, } from '@nestjs/mongoose';
import { IsDate, IsDateString, IsNotEmpty, IsOptional } from 'class-validator';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

export enum Status {
    Cancelled = 'cancelled',
    Finished = 'finished',
    Ongoing = 'ongoing',
}


@Schema()
export class Events extends Document {

    @Prop({required: true})
    title: string;

    @Prop()
    description: string;

    @IsDateString()
    @Prop({required: true})
    startDate: Date;

    @IsDateString()
    @Prop()
    endDate: Date;

    @IsDateString()
    @IsOptional()
    @Prop()
    startTime?: Date;

    @IsDateString()
    @IsOptional()
    @Prop()
    endTime?: Date;

    @IsOptional()
    @Prop()
    location?: string;

    @Prop()
    @IsNotEmpty()
    status: Status;
    
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
    creator: User;

    @Prop({type: [MongooseSchema.Types.ObjectId], ref: 'User'})
    @IsOptional()
    invitees?: User[];

    @Prop({default:false})
    isDeleted:boolean

    @Prop()
    deleteDate: Date;
}

const EventsSchema = SchemaFactory.createForClass(Events);
export { EventsSchema };