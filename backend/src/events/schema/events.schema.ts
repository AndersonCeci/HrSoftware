import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';


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

  @Prop()
  eventEndTime?: string;

  @Prop({
    type: {
      location: {
        latitude: { type: Number },
        longitude: { type: Number },
      },
      address: { type: String },
      name: { type: String },
    },
  })
  location?: {
    location?: {
      latitude: number;
      longitude: number;
    };
    address?: string;
    name?: string;
  };

  @Prop([String])
  images: string[];

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop()
  deleteDate: Date;
}

export const EventSchema = SchemaFactory.createForClass(Event);
