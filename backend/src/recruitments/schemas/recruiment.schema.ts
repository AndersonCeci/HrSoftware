import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Recruitment extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  surname: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  phoneNumber: number;

  @Prop({ required: true })
  position: string;

  @Prop({
    required: true,
    enum: [
      'Applied',
      'Rejected',
      '1st Interview',
      '2nd Interview',
      'Offer Made',
    ],
  })
  stage: string;

  @Prop()
  reference: string;

  @Prop()
  cv: string;

  @Prop()
  submittedDate: string;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop()
  deleteDate: Date;
}

export const RecruitmentSchema = SchemaFactory.createForClass(Recruitment);
