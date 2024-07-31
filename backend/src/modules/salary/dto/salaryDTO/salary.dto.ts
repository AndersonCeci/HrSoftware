import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, Max, Min, ValidateNested } from "class-validator";
import { BonusDTO } from "../bonusDTO/createBonus.dto";
import { Types } from "mongoose";

export class SalaryDTO {
    @IsNotEmpty()
    readonly employeeID: Types.ObjectId;

    @IsNotEmpty()
    @IsString()
    readonly NSSH: string;

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
    @IsNumber()
    @Min(1)
    @Max(12)
    readonly month: number;  

    @IsNotEmpty()
    @IsNumber()
    @Min(1900)
    @Max(new Date().getFullYear() + 1)  
    readonly year: number;

    isDeleted:boolean;
    deleteDate?:Date;
}
