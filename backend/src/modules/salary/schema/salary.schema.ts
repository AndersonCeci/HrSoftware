import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as muv from 'mongoose-unique-validator';

@Schema()
export class Salary extends Document {
  @Prop({ required: true , unique: true})
  employeeID: string

  @Prop({ required: true })
  
  netSalary: number;

  @Prop({ required: true })
   noDays: number;

  @Prop({ required: true })
  bonuses: Map<String,number>;

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
export {SalarySchema};

