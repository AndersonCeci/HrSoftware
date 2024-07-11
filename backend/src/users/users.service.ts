import { Injectable } from "@nestjs/common";
import { User } from "./schemas/user.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    createUser(createUserDto: CreateUserDto) {
        const newUser = new this.userModel(createUserDto);
        return newUser.save();
    }

    getUsers() {
        return this.userModel.find();
    }


}