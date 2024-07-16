import { IsDate, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly surname: string;

  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly birthdate: Date;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  readonly role: string;
}

