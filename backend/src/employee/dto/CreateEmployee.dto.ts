import {
  IsNotEmpty,
  IsEmail,
  IsString,
  IsEnum,
  Matches,
  isDate,
  IsDateString,
  IsOptional,
} from 'class-validator';
import { Role } from 'src/users/schemas/user.schema';
import { Position } from '../schema/employe.schema';

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsString()
  surname: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  // @IsNotEmpty()
  // @IsString()
  // readonly password: string;

  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[A-Z]\d{8}[A-Z]$/, { message: 'nID must be exactly 10 digits' })
  nID: string;

  @IsEnum(Position)
  position: Position;

  startingDate?: string;

  phoneNumber: string;

  @IsOptional()
  birdthDay: Date;

  fullName: string;

  @IsEnum(['Female', 'Male'], {
    message: 'Must be one of the following gender',
  })
  gender?: string;

  @IsString()
  teamLeader: string;

  @IsString()
  contract: string;

  isDeleted: boolean;
}
