import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsOptional, Matches } from 'class-validator';
import { Document } from 'mongoose';

@Schema()
export class Event extends Document {

@Prop({ required: true })
eventName:string;

@Prop()
eventDescription:string;

@Prop({ required: true })
eventDate:string;

@Prop({ required: true })
eventStartTime:string

@Prop({ required: true })
eventEndTime:string;

@Prop({ required: true })
location:string;

@Prop()
image:string;


}

export const EventSchema = SchemaFactory.createForClass(Event);