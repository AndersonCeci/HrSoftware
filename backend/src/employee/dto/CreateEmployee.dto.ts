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
  @Matches(/^\d{10}$/, { message: 'nID must be exactly 10 digits' })
  nID: string;

  @IsString()
  position?: string;

  startingDate?: string;

  phoneNumber: number;

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
