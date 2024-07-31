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

  @Prop({ required: true })
  eventStartTime: string;

  @Prop({ required: true })
  eventEndTime: string;

  @Prop()
  location: string;

  @Prop()
  image: string;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop()
  deleteDate: Date;
}

export const EventSchema = SchemaFactory.createForClass(Event);
