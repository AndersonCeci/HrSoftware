// create-recruitment.dto.ts
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsEnum,
  IsNumber,
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

  phoneNumber: number;

  @IsNotEmpty()
  @IsString()
  readonly surname: string;

  @IsNotEmpty()
  @IsEnum(
    ['Applied', 'Rejected', '1st Interview', '2nd Interview', 'Offer Made'],
    {
      message:
        'Stage must be one of the following: Approved, Rejected, 1st Interview, 2nd Interview',
    },
  )
  readonly stage: 'Approved' | 'Rejected' | '1st Interview' | '2nd Interview';

  @IsOptional()
  @IsString()
  readonly reference?: string;

  @IsOptional()
  @IsString()
  readonly cv?: string;

  submittedDate: Date;
}
