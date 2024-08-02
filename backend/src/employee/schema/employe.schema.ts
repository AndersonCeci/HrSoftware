import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsOptional, Matches } from 'class-validator';
import { Document } from 'mongoose';

@Schema()
export class Employee extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  surname: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  @Matches(/^[A-Z]\d{8}[A-Z]$/, { message: 'nID must be exactly 10 digits' })
  nID: string;

  @Prop()
  position: string;

  @Prop()
  startingDate: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  @IsOptional()
  teamLeader: string;

  @Prop({
    enum: ['Female', 'Male'],
  })
  gender: string;

  @Prop()
  salary: number;

  @Prop()
  contract: string;

  @Prop({ default: false })
  deleteDate: string;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
