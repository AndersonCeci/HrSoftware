import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Req,
  UseGuards,
  Delete,
  HttpException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './users.service';
import { ChangePasswordDTO } from './dto/update-password.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import mongoose from 'mongoose';

@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @Get('one')
  async getOneUser(@Param('userId') userId:string) {
    return await this.userService.findOne(userId);
  }

  @Get()
  async getUsers() {
    return await this.userService.getUsers();
  }

  @Get(':email')
  async getUserByEmail(@Param('email') email: string) {
    return await this.userService.getUserByEmail(email);
  }

  @UseGuards(AuthGuard)
  @Put('change-password')
  async updatePassword(
    @Req() req: any,
    @Body() updatePasswordDto: ChangePasswordDTO,
  ) {
    return await this.userService.updatePassword(
      req.user.username,
      updatePasswordDto.oldPassword,
      updatePasswordDto.newPassword,
    );
  }

  @Delete(':id')
  async softDeleteById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 404);
    const result = await this.userService.softDeleteUserById(id);
    if (!result) {
      throw new HttpException('No assets found for the given ID', 404);
    }
    return result;
  }
}
