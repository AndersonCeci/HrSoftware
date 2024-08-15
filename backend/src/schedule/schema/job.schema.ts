import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class CronJob {
  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ required: true, unique: true })
  name: string;
}
export const CronJobSchema = SchemaFactory.createForClass(CronJob);
