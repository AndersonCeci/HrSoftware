import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsEnum,
} from 'class-validator';
import { RecruitmentStage } from '../schemas/recruitment.schema';
import { InterviewDTO } from '../interviewDTO/interview.dto';
import { Type } from 'class-transformer';

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
  @Type(() => InterviewDTO)
  readonly firstIntervie?: InterviewDTO;

  @IsOptional()
  @Type(() => InterviewDTO)
  readonly secondInterview?: InterviewDTO;

  @IsOptional()
  @IsString()
  readonly reference?: string;

  @IsOptional()
  @IsString()
  readonly cv?: string;

  @IsOptional()
  readonly submittedDate: Date;

  @IsOptional()
  readonly isDeleted: boolean;

  @IsOptional()
  readonly deleteDate?: Date;
}

export class RecruitmentWithFileDto extends CreateRecruitmentDto {
  file?: {
    filename: string;
    data: string;
  };
}
