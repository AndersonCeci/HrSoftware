import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Max, Min, ValidateNested } from 'class-validator';
import { UpdateBonusDTO } from '../bonusDTO/updateBonus.dto';

export class UpdateSalaryDTO {
  @IsOptional()
  @IsString()
  readonly employeeID: string;

  @IsOptional()
  @IsString()
  readonly NSSH: string;

  @IsOptional()
  @IsNumber()
  readonly netSalary: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(30)
  readonly workDays: number;
  
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdateBonusDTO)
  readonly bonuses: UpdateBonusDTO[];

  @IsOptional()
  @IsNumber()
  readonly socialSecurityContributions: number;

  @IsOptional()
  @IsNumber()
  readonly healthInsurance: number;

  @IsOptional()
  @IsNumber()
  readonly grossSalary: number;

  @IsOptional()
  @IsNumber()
  readonly total: number;
}

