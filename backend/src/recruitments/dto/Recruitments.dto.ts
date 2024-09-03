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
import { OfferMadeDTO } from './OfferMade.dto';

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

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsNotEmpty()
  @IsString()
  readonly surname: string;

  @IsNotEmpty()
  @IsEnum(RecruitmentStage, {
    message:
      'Stage must be one of the following: Applied, Rejected, 1st Interview, 2nd Interview, Offer Made',
  })
  readonly stage: RecruitmentStage;

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
  @Type(() => Date)
  readonly submittedDate?: Date;

  @IsOptional()
  readonly isDeleted?: boolean;

  @IsOptional()
  @Type(() => Date)
  readonly deleteDate?: Date;
}

export class RecruitmentWithFileDto extends CreateRecruitmentDto {
  file?: {
    filename: string;
    data: string;
  };
}
