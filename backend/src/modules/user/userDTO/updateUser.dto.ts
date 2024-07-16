import { IsOptional, IsString, IsDate } from "class-validator";

export class UpdateUserDTO{
    @IsOptional()
    @IsString()
    readonly name: string;
  
    @IsOptional()
    @IsString()
    readonly surname: string;
  
    @IsOptional()
    @IsString()
    readonly email: string;
  
    @IsOptional()
    @IsDate()
    readonly birthdate: Date;
  
    @IsOptional()
    @IsString()
    readonly password: string;
  
    @IsOptional()
    @IsString()
    readonly role: string;
}