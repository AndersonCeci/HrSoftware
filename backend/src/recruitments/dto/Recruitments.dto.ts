import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsEnum,
  IsNumber,
} from 'class-validator';
import { RecruitmentStage } from '../schemas/recruitment.schema';

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

  phoneNumber: number;

  @IsNotEmpty()
  @IsString()
  readonly surname: string;

  @IsNotEmpty()
  @IsEnum(RecruitmentStage, {
    message:
      'Stage must be one of the following: Applied ,Approved, Rejected, 1st Interview, 2nd Interview',
  })
  readonly stage: RecruitmentStage;

  @IsOptional()
  @IsString()
  readonly reference?: string;

  @IsOptional()
  @IsString()
   cv?: string;

  submittedDate: Date;

  isDeleted: boolean;
  deleteDate?: Date;
}



export class RecruitmentWithFileDto extends CreateRecruitmentDto {
  file?: {
    filename: string;
    data: string;
  };
}