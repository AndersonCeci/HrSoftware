import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsNumber, IsOptional, IsString, Max, Min, ValidateNested } from 'class-validator';
import { UpdateBonusDTO } from '../bonusDTO/updateBonus.dto';

export class UpdateSalaryDTO {
  @IsOptional()
  @IsString()
   employeeID: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
   dateTaken?: Date;

  @IsOptional()
  @IsNumber()
   netSalary: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(30)
   workDays: number;
  
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdateBonusDTO)
   bonuses: UpdateBonusDTO[];

  @IsOptional()
  @IsNumber()
   socialSecurityContributions: number;

  @IsOptional()
  @IsNumber()
   healthInsurance: number;

  @IsOptional()
  @IsNumber()
   grossSalary: number;

  @IsOptional()
  @IsNumber()
   total: number;

   @IsOptional()
  @IsBoolean()
  readonly paid: boolean;
}

