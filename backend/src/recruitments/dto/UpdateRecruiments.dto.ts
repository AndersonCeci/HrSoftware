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
  @IsEnum(['approved', 'rejected', '1st interview', '2nd interview'], {
    message:
      'Stage must be one of the following: approved, rejected, 1st interview, 2nd interview',
  })
  @IsNotEmpty()
  readonly stage?: 'approved' | 'rejected' | '1st interview' | '2nd interview';

  @IsOptional()
  @IsString()
  readonly reference?: string;

  @IsOptional()
  @IsString()
  readonly cv?: string;
}
