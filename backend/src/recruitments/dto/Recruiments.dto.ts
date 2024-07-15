// create-recruitment.dto.ts
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsEnum,
} from 'class-validator';

export class CreateRecruitmentDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly position: string;

  @IsNotEmpty()
  @IsEnum(['approved', 'rejected', '1st interview', '2nd interview'], {
    message:
      'Stage must be one of the following: approved, rejected, 1st interview, 2nd interview',
  })
  readonly stage: 'approved' | 'rejected' | '1st interview' | '2nd interview';

  @IsOptional()
  @IsString()
  readonly reference?: string;

  @IsOptional()
  @IsString()
  readonly cv?: string; 
}
