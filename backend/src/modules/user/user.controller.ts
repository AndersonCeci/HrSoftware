import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';
import { CreateUserDTO } from './userDTO/createUser.dto';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { Roles } from 'src/decorators/role.decorator';

@Controller('user')
export class UserController {
  constructor(private userService:UserService){}
@Roles(["hr"])
@UseGuards(AuthenticationGuard,AuthorizationGuard)
@Post()
async createUser(
    @Body() user : CreateUserDTO
): Promise<User>{
    return this.userService.create(user)
}
@Get()
async getAllUsers():Promise<User[]>{
    return this.userService.getAllUsers();
}
@Delete(":id")
async deleteUser(
    @Param("id")
    id:String
): Promise<User>{
    return this.userService.deleteUser(id);
}
@Get("search/:name")
async searchByName(@Param("name") name:string): Promise<User[]>{
    return this.userService.searchByName(name);
}


}


