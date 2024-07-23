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


  @Prop({type : Date})
  submittedDate: Date;
}

export const RecruitmentSchema = SchemaFactory.createForClass(Recruitment);
