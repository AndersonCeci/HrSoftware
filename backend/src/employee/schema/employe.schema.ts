import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEnum, IsOptional, Matches } from 'class-validator';
import { Role } from 'src/users/schemas/user.schema';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Promotion } from 'src/promotion/schema/promotion.schema';

export enum Position {
  JuniorFrontEnd = 'Junior FrontEnd',
  JuniorBackEnd = 'Junior BackEnd',
  SeniorFrontEnd = 'Senior FrontEnd',
  SeniorBackEnd = 'Senior BackEnd',
  FullStack = 'FullStack',
  DevOps = 'DevOps',
  ProjectManager = 'projectManager',
}

@Schema()
export class Employee extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  surname: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  @Matches(/^[A-Z]\d{8}[A-Z]$/, { message: 'nID must be exactly 10 digits' })
  nID: string;

  @Prop()
  @IsEnum(Position)
  position: Position;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Promotion' }] })
  promotionHistory: Promotion[];

  @Prop()
  @IsEnum(Role)
  role: Role;

  @Prop()
  startingDate: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  fullName: string;

  @Prop()
  birthDay: Date;

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
