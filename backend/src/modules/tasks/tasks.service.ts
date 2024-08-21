import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './tasksDTO/tasks.dto';
import { Task } from './schema/tasks.schema';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

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
      console.log(error);
    }
  }

  findAllTasks(): Promise<Task[]> {
    return this.taskModel.find({ isDeleted: false }).exec();
  }

  findTaskById(id: string): Promise<Task | null> {
    return this.taskModel.findById(id).exec();
  }

  softDeleteTaskById(id: string): Promise<Event> {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    return this.taskModel.findByIdAndUpdate(
      id,
      { isDeleted: true, deleteDate: currentDate },
      { new: true },
    );
  }

  editTask(id: string, updateTaskDto: CreateTaskDto): Promise<Task | null> {
    return this.taskModel
      .findByIdAndUpdate(id, updateTaskDto, { new: true })
      .exec();
  }
}
