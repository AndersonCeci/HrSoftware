import { Schema,Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";
import { Document } from 'mongoose';



@Schema()
export class DayOff extends Document {
    @Prop({ type: Types.ObjectId, ref: 'Employee', required: true })
    employeeId: Types.ObjectId;

    @Prop()
    EmployeeName: string;
    
    @Prop({required:true})
    StartTime: Date;
    
    @Prop({required:true})
	EndTime: Date;

    @Prop({
        enum: ['annual', 'sick','other'],
      })
    leaveType:string;

    @Prop()
    totalDays: number;
  

    @Prop({required:true})
    description:string;

    @Prop({ default: false })
  isDeleted: boolean;

  @Prop()
  deleteDate: Date;

   

    
}

export const DayOffSchema = SchemaFactory.createForClass(DayOff)

