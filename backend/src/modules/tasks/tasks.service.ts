import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateTaskDto } from "./tasksDTO/tasks.dto";
import { Task } from "./schema/tasks.schema";
import { Model, Types } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";



@Injectable() 
export class TasksService {

    constructor(
        @InjectModel(Task.name) private readonly taskModel: Model<Task>,  
    ) {}

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        try {
            const createdTask = new this.taskModel(createTaskDto);
            return await createdTask.save();

        } catch (error) {
            // throw new Error('Failed to create task');
            console.log(error);
        }
    }


    findAllTasks(): Promise<Task[]> {
        return this.taskModel.find().exec();
    }

    findTaskById(id: string): Promise<Task | null> {
        return this.taskModel.findById(id).exec();
    }

    async deleteTask(id: string): Promise<Task | null> {
        if (!Types.ObjectId.isValid(id)) {
          throw new BadRequestException('Invalid ID format');
        }
        return this.taskModel.findByIdAndDelete(id).exec();
      }

    editTask(id: string, updateTaskDto: CreateTaskDto): Promise<Task | null> {
        return this.taskModel.findByIdAndUpdate(id, updateTaskDto, { new: true }).exec();
    }
}
