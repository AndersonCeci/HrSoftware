import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "./schemas/user.schema";
import { UsersController } from "./users.controller";
import { UserService } from "./users.service";


@Module({
    imports: [
        MongooseModule.forFeature([{
            name: 'User',
            schema: UserSchema,
        }])
    ],
    controllers: [UsersController],
    providers: [UserService],
    exports: [UserService],
})

export class UsersModule {}