import { IsString, IsEnum, IsNotEmpty } from 'class-validator';
import { Role } from '../schemas/user.schema';
import { ObjectId, Types } from 'mongoose';


export class CreateUserDto
{
  employID: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;


  isDeleted: boolean;
  
  deleteDate?: Date;
  
  @IsString()
  email: string;
}
