import { Controller, Post, Body, Get, Param, Put, Req, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserService } from "./users.service";
import { ChangePasswordDTO } from "./dto/update-password.dto";
import { AuthGuard } from "src/auth/guards/auth.guard";

@Controller('users')
export class UsersController {
    constructor(private userService: UserService) { }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {
        return await this.userService.createUser(createUserDto);
    }

    @Get()
    async getUsers() {
        return await this.userService.getUsers();
    }

    @Get(':username')
    async getUserByUsername(@Param('username') username: string) {
        return await this.userService.getUserByUsername(username);
    }
    
    @UseGuards(AuthGuard)
    @Put('change-password')
    async updatePassword(
        @Req() req: any,
        @Body() updatePasswordDto: ChangePasswordDTO
    ) {
        return await this.userService.updatePassword(req.user.username,updatePasswordDto.oldPassword, updatePasswordDto.newPassword);
    }
}
