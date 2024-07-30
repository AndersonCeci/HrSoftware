import { MongooseModule } from "@nestjs/mongoose";
import { Task, TaskSchema } from "./schema/tasks.schema";
import { Controller, Module } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { TasksController } from "./tasks.controller";



@Module({
    imports: [
        MongooseModule.forFeature([{
            name: Task.name,
            schema: TaskSchema,
        },
    ]),
    ],
    providers: [TasksService],
    controllers: [TasksController],
    exports: [TasksService],
})

export class TasksModule { }