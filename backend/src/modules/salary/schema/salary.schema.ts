import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import * as muv from 'mongoose-unique-validator';
import { Bonus, BonusSchema } from '../models/bonus.model';

@Schema({ timestamps: true })
export class Salary extends Document {
  @Prop({ required: true, ref: "Employee" })
  employeeID: Types.ObjectId;

  @Prop({ required: true })
  month: number; 

  @Prop({ required: true })
  year: number;

  @Prop({ required: true })
  netSalary: number;

  @Prop({ required: true })
  workDays: number;

  @Prop({ type: [BonusSchema], required: true })
  bonuses: Bonus[];

  @Prop({ required: true })
  socialSecurityContributions: number;

  @Prop({ required: true })
  healthInsurance: number;

  @Prop({ required: true })
  grossSalary: number;

  @Prop({ required: true })
  total: number;
}

const SalarySchema = SchemaFactory.createForClass(Salary);
SalarySchema.index({ employeeID: 1, month: 1, year: 1 }, { unique: true });
SalarySchema.plugin(muv, { message: 'Error, expected {PATH} to be unique.' });

export { SalarySchema };
