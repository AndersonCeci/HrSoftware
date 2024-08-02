import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { BonusDTO } from '../bonusDTO/createBonus.dto';
import { Types } from 'mongoose';

export class SalaryDTO {
  @Type(() => Types.ObjectId)
  @IsNotEmpty()
  readonly employeeID: Types.ObjectId;

  @IsNotEmpty()
  @Type(() => Date)
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

  @ValidateNested({ each: true })
  @Type(() => BonusDTO)
  readonly bonuses?: BonusDTO[];

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

  @IsBoolean()
  readonly paid?: boolean;
  

    isDeleted:boolean;
    deleteDate?:Date;
}
