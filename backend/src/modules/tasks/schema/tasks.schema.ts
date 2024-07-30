import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsDateString } from "class-validator";
import { Document, Schema as MongooseSchema } from 'mongoose';



export enum TaskStatus {
    TO_DO = 'TO_DO',
    DOING = 'DOING',
    DONE = 'DONE',
}

@Schema()
export class Task extends Document {

    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @IsDateString()
    due_date: string;

    @Prop({ required: true, enum: TaskStatus })
    status: TaskStatus;
}

const TaskSchema = SchemaFactory.createForClass(Task);
export { TaskSchema };