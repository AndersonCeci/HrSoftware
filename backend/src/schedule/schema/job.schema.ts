import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as muv from 'mongoose-unique-validator';

@Schema({ timestamps: true })
export class CronJob {
  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ required: true })
  step: string;

  @Prop({ required: true, unique: true })
  name: string;
}
export const CronJobSchema = SchemaFactory.createForClass(CronJob).plugin(muv, {
  message: 'Error, expected job name to be unique.',
});
