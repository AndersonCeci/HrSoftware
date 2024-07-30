import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { BonusDTO } from '../bonusDTO/createBonus.dto';

export class SalaryDTO {
  @IsNotEmpty()
  @IsString()
  readonly employeeID: string;

  @IsNotEmpty()
  @IsDate()
  readonly dateTaken: Date;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  readonly netSalary: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(30)
  readonly workDays: number;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => BonusDTO)
  readonly bonuses: BonusDTO[];

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  readonly socialSecurityContributions: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  readonly healthInsurance: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  readonly grossSalary: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  readonly total: number;

  @IsNotEmpty()
  @IsBoolean()
  readonly paid: boolean;
}
