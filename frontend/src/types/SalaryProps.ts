import { Bonus } from "./BonusProps";

export type Salary ={
    employeeID:string;
    NSSH: string;
    netSalary:number;
    workDays:number;
    bonuses:Bonus[];
    socialSecurityContributions: number;
    healthInsurance:number;
    grossSalary:number;
    total:number;
}


