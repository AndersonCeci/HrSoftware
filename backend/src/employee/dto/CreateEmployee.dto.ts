import {
  IsNotEmpty,
  IsEmail,
  IsString,
  IsEnum,
  Matches,
} from 'class-validator';

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsString()
  surname: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @Matches( /^[A-Z]\d{8}[A-Z]$/, { message: 'nID must be exactly 10 digits' })
  nID: string;

  @IsString()
  position?: string;

  startingDate?: string;

  phoneNumber: string;

  @IsEnum(['Female', 'Male'], {
    message: 'Must be one of the following gender',
  })
  gender?: string;

  @IsString()
  teamLeader: string;

  @IsString()
  contract: string;

  isDeleted: boolean;
  deleteDate:Date
}
