import { Controller, Post, UsePipes, Body, ValidationPipe, Get } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserService } from "./users.service";

@Controller('users')
export class UsersController {

    constructor(private userService: UserService) { }

    @Post()
    @UsePipes(new ValidationPipe())
    async createUser(@Body() createUserDto: CreateUserDto) {
        console.log(createUserDto);
        return this.userService.createUser(createUserDto);
    }

    @Get()
    getUsers() {
        return this.userService.getUsers();
    }

}