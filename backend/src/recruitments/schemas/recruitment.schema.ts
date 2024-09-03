import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Interview } from './interview.schema';
export enum RecruitmentStage {
  Applied = 'Applied',
  Rejected = 'Rejected',
  FirstInterview = '1st Interview',
  SecondInterview = '2nd Interview',
  OfferMade = 'Offer Made',
}
export enum ContractTypes {
  FullTime = 'Full Time',
  PartTime = 'Part Time',
  Temporary = 'Temporary',
  Internship = 'Internship',
  Seasonal = 'Seasonal',
  FixedTerm = 'Fixed Term',
  Indefinite = 'Indefinite',
  Freelance = 'Freelance',
  Remote = 'Remote',
  Apprenticeship = 'Apprenticeship',
}
@Schema()
export class OfferMade {
  @Prop({ required: true })
  offeredSalary: number;

  @Prop({ required: true, enum: ContractTypes })
  contractType: ContractTypes;

  @Prop({ required: true, type: Date })
  startDate: Date;
}

@Schema()
export class Recruitment extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  surname: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  phoneNumber: string;

  @Prop({ required: true })
  position: string;

  @Prop({
    required: true,
    enum: RecruitmentStage,
    default: RecruitmentStage.Applied,
  })
  stage: string;

  @Prop({ type: Interview })
  firstInterview?: Interview;

  @Prop({ type: Interview })
  secondInterview?: Interview;

  @Prop({ type: OfferMade })
  offerMade?: OfferMade;
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
