import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Event extends Document {
  @Prop({ required: true })
  eventName: string;

  @Prop()
  eventDescription: string;

  @Prop({ required: true })
  eventDate: Date;

  @Prop()
  eventEndDate: Date;

  @Prop({ required: true })
  eventStartTime: string;

  @Prop({ required: true })
  eventEndTime: string;

  

  @Prop([String])
  images: string[];

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop()
  deleteDate: Date;
}

export const EventSchema = SchemaFactory.createForClass(Event);
