import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Employee, Position } from 'src/employee/schema/employe.schema';

@Schema()
export class Promotion extends Document {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Employee',
    required: true,
  })
  employee: Employee;

  @Prop()
  employeeName: string;

  @Prop({ required: true })
  oldPosition: Position;

  @Prop({ required: true })
  newPosition: Position;

  @Prop({ required: true })
  oldSalary: number;

  @Prop({ required: true })
  newSalary: number;

  @Prop({ required: true })
  dateOfPromotion: Date;

  @Prop({ required: true })
  trainedBy: string;
}

export const PromotionSchema = SchemaFactory.createForClass(Promotion);
