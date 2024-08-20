import { Prop, Schema } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Interview {
  @Prop()
  date: Date;
  @Prop()
  notes: string;
  @Prop()
  evaluation: string;
  @Prop()
  interviewers: [{ type: Types.ObjectId; ref: 'Employee' }];
}
