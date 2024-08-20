import {
  IsDate,
  IsEnum,
  IsMongoId,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { RecruitmentStage } from '../schemas/recruitment.schema';

export class InterviewDTO {
  @IsDate()
  @Type(() => Date)
  date: Date;

  @IsEnum(RecruitmentStage)
  stage: RecruitmentStage;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsString()
  evaluation?: string;

  @IsOptional()
  @IsMongoId({ each: true })
  interviewers?: string[];
}
