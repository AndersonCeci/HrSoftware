import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import * as muv from 'mongoose-unique-validator';
import { Bonus, BonusSchema } from '../models/bonus.model';



@Schema()
export class Salary extends Document {
  @Prop({ required: true, unique: true })
  employeeID: string;

  @Prop({ required: true, unique: true })
  NSSH: string;

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
SalarySchema.plugin(muv, { message: 'EmployeeID must be unique' });
export { SalarySchema };
