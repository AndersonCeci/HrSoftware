import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export enum RecruitmentStage {
  Applied = 'Applied',
  Rejected = 'Rejected',
  FirstInterview = '1st Interview',
  SecondInterview = '2nd Interview',
  OfferMade = 'Offer Made',
}
@Schema()
export class Recruitment extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  surname: string;

  @Prop({ required: true, })
  email: string;

  @Prop()
  phoneNumber: number;

  @Prop({ required: true })
  position: string;

  @Prop({
    required: true,
    enum: RecruitmentStage,
    default: RecruitmentStage.Applied,
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
