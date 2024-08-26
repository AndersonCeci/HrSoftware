import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Coordinates extends Document {
  @Prop()
  locationName: string;

  @Prop()
  longtitude: string;

  @Prop()
  latitude: string;

}

export const CoordinatesSchema = SchemaFactory.createForClass(Coordinates);
