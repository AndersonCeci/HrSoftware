import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsEnum,
} from 'class-validator';
import { RecruitmentStage } from '../schemas/recruitment.schema';

export class UpdateRecruitmentDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly name?: string;

  @IsOptional()
  @IsEmail()
  @IsNotEmpty()
  readonly email?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly position?: string;

  @IsOptional()
  @IsEnum(RecruitmentStage, {
    message:
      'Stage must be one of the following: Applied, Approved, Rejected, 1st Interview, 2nd Interview',
  })
  @IsNotEmpty()
  readonly stage?: RecruitmentStage;

  @IsOptional()
  @IsString()
  readonly reference?: string;

  @IsOptional()
  @IsString()
  readonly cv?: string;

  readonly submittedDate: Date;
}
