import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


export enum Position {
  HR = 'hr',
  Dev = 'dev',
  ProjectManager = 'projectManager',
}


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
  nID: string;

  @Prop()
  position: string;
  enum: Position;

  @Prop({ type: Date })
  startingDate: Date;

  @Prop()
  salary: number;

  @Prop({ default: false })  
  isDeleted: boolean;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
