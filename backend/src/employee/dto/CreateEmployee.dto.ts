import {
  IsNotEmpty,
  IsEmail,
  IsString,
  IsEnum,
  Matches,
  isDate,
  IsDateString,
  IsArray,
  IsOptional,
} from 'class-validator';
import { Role } from 'src/users/schemas/user.schema';
import { EmploymentStatus, Position } from '../schema/employe.schema';
import { Types } from 'mongoose';

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsString()
  surname: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[A-Z]\d{8}[A-Z]$/, { message: 'nID must be exactly 10 digits' })
  nID: string;

  @IsEnum(Position)
  position: Position;

  @IsEnum(EmploymentStatus)
  status: EmploymentStatus;

  startingDate?: string;

  phoneNumber: string;

  @IsOptional()
  @IsString()
  profilePhoto?: string;

  @IsOptional()
  birthDay: Date;

  fullName: string;

  @IsEnum(['Female', 'Male'], {
    message: 'Must be one of the following gender',
  })
  gender?: string;

  @IsArray()
  @IsOptional()
  teamLeaders?: Types.ObjectId[];

  @IsOptional()
  @IsString()
  contract?: string;

  isDeleted: boolean;
}
