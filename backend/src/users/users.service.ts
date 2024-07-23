import { Injectable } from "@nestjs/common";
import { User, Role } from "./schemas/user.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    async createUser(createUserDto: CreateUserDto) {
        let { username, password, role } = createUserDto;
        
        let loginRole: Role = role;

        if ( role === Role.Dev || role === Role.ProjectManager) {
            loginRole = Role.Employee;
        }

        const newUser = new this.userModel({
            username,
            password,
            role,
            loginRole
        })

        return newUser.save();
    }

    getUsers() {
        return this.userModel.find();
    }

    getUserByUsername(username: string) {
        return this.userModel.findOne({username});
      }

      async findById(userId: string): Promise<User | null> {
        return this.userModel.findById(userId).exec();
    }
      
}