import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class SalaryDTO {
    @IsNotEmpty()
    @IsString()
    readonly employeeID: string;
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    readonly netSalary: number;
    @IsNotEmpty()
    readonly bonuses: Map<String,number>;
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

}