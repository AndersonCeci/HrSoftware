import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsEnum,
  IsDate,
} from 'class-validator';
import { RecruitmentStage } from '../schemas/recruitment.schema';
import { Type } from 'class-transformer';
import { InterviewDTO } from '../interviewDTO/interview.dto';
import { OfferMadeDTO } from './OfferMade.dto';

export class UpdateRecruitmentDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly name?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly surname?: string;

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
  @Type(() => InterviewDTO)
  readonly firstInterview?: InterviewDTO;

  @IsOptional()
  @Type(() => InterviewDTO)
  readonly secondInterview?: InterviewDTO;

  @IsOptional()
  @Type(() => OfferMadeDTO)
  readonly offerMade?: OfferMadeDTO;

  @IsOptional()
  @IsString()
  readonly reference?: string;

  @IsOptional()
  @IsString()
  readonly cv?: string;

  @IsOptional()
  @IsDate()
  readonly submittedDate: Date;
}
