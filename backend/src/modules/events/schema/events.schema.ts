import { Schema, Prop, SchemaFactory, } from '@nestjs/mongoose';
import { IsDate, IsDateString, IsNotEmpty, IsOptional } from 'class-validator';
import { Document } from'mongoose';

export enum Status {
    Progress = 'progress',
    Completed = 'completed',
    Cancelled = 'cancelled',
    Finished = 'finished',
}


@Schema()
export class Events extends Document {

    @Prop({required: true})
    title: string;

    @Prop({required: true})
    description: string;

    @IsDateString()
    @Prop({required: true})
    startDate: Date;

    @IsDateString()
    @Prop({required: true})
    endDate: Date;

    @IsDateString()
    @IsOptional()
    startTime?: Date;

    @IsDateString()
    @IsOptional()
    endTime?: Date;

    @IsOptional()
    location?: string;

    createdAt: string;

    updatedAt: string;

    @Prop()
    @IsNotEmpty()
    status: Status;
    //This is for future reference to the employee who created this event

    // employeeID: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Employee',
    // }

}

const EventsSchema = SchemaFactory.createForClass(Events);
export { EventsSchema };