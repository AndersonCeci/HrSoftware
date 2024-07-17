import { IsOptional } from "class-validator";

export class UpdateSalaryDTO{
    @IsOptional()
    readonly employeeID: string;
    @IsOptional()
    readonly netSalary: number;
    @IsOptional()
    readonly bonuses: Map<String,number>;
    @IsOptional()
    readonly socialSecurityContributions: number;
    @IsOptional()
    readonly healthInsurance: number;
    @IsOptional()
    readonly grossSalary: number;
    @IsOptional()
    readonly total: number; 

}