import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsDateString } from 'class-validator';
import { Document, Schema as MongooseSchema } from 'mongoose';

export enum ReminderStatus {
  TO_DO = 'TO_DO',
  DOING = 'DOING',
  DONE = 'DONE',
}

@Schema()
export class Task extends Document {
  @Prop({ required: true })
  reminderTitle: string;

  @Prop({ required: true })
  message: string;

  @IsDateString()
  @Prop()
  due_date: Date;

  @Prop({ required: true, enum: ReminderStatus })
  status: ReminderStatus;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ default: false })
  deleteDate: Date;
}

const TaskSchema = SchemaFactory.createForClass(Task);
export { TaskSchema };
