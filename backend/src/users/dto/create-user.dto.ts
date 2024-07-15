import { IsString, IsEnum, IsNotEmpty } from 'class-validator';
import { Role } from '../schemas/user.schema';

export class CreateUserDto {


  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;
}
