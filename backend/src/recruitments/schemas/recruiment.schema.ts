import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Recruitment extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  position: string;

  @Prop({
    required: true,
    enum: ['approved', 'rejected', '1st interview', '2nd interview', 'pending'],
    default: '1st interview',
  })
  stage: string;

  @Prop()
  reference: string;

  @Prop()
  cv: string;
}

export const RecruitmentSchema = SchemaFactory.createForClass(Recruitment);
