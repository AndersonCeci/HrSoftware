import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsEnum,
} from 'class-validator';

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
  @IsEnum(
    ['Applied', 'Rejected', '1st Interview', '2nd Interview', 'Offer Made'],
    {
      message:
        'Stage must be one of the following: Approved, Rejected, 1st Interview, 2nd Interview',
    },
  )
  @IsNotEmpty()
  readonly stage?: 'Approved' | 'Rejected' | '1st Interview' | '2nd Interview';

  @IsOptional()
  @IsString()
  readonly reference?: string;

  @IsOptional()
  @IsString()
  readonly cv?: string;

  readonly submittedDate: Date;
}
