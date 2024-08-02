import { Injectable } from '@nestjs/common';
export interface Payroll {
  netSalary: number;
  socialInsuranceEmployee: number;
  healthInsuranceEmployee: number;
  incomeTax: number;
}

@Injectable()
export class PayrollService {
  private readonly SOCIAL_INSURANCES_COMPANY_COEFICIENT = 0.15;
  private readonly SOCIAL_INSURANCES_EMPLOYEE_COEFICIENT = 0.095;
  private readonly HEALTH_INSURANCES_EMPLOYEE_COEFICIENT = 0.017;
  private readonly INCOME_TAX_COEFICIENT_1_13Percent = 0.13;
  private readonly INCOME_TAX_COEFICIENT_2_23Percent = 0.23;
  private readonly INCOME_TAX_INTERVAL_2_50000 = 50000;
  private readonly INCOME_TAX_INTERVAL_2_60000 = 60000;
  private readonly INCOME_TAX_INTERVAL_3_200000 = 200000;
  private readonly MAX_SALARY = 176416;

  calculateNetSalary(grossSalary: number): Payroll {
    const healthInsuranceEmployee =
      this.getHealthInsuranceEmployee(grossSalary);
    const socialInsuranceEmployee =
      this.getSocialInsuranceEmployee(grossSalary);
    const incomeTax = this.getIncomeTax(grossSalary);
    const netSalary =
      grossSalary -
      socialInsuranceEmployee -
      healthInsuranceEmployee -
      incomeTax;
    return {
      netSalary,
      socialInsuranceEmployee,
      healthInsuranceEmployee,
      incomeTax,
    };
  }

  private getHealthInsuranceEmployee(taxableSalary: number): number {
    return taxableSalary * this.HEALTH_INSURANCES_EMPLOYEE_COEFICIENT;
  }

  private getSocialInsuranceEmployee(taxableSalary: number): number {
    return (
      Math.min(this.MAX_SALARY, taxableSalary) *
      this.SOCIAL_INSURANCES_EMPLOYEE_COEFICIENT
    );
  }

  private getIncomeTax(taxableSalary: number): number {
    if (taxableSalary <= this.INCOME_TAX_INTERVAL_2_50000) {
      return 0;
    }
    if (taxableSalary <= this.INCOME_TAX_INTERVAL_2_60000) {
      return (taxableSalary - 35000) * this.INCOME_TAX_COEFICIENT_1_13Percent;
    }
    if (taxableSalary <= this.INCOME_TAX_INTERVAL_3_200000) {
      return (taxableSalary - 30000) * this.INCOME_TAX_COEFICIENT_1_13Percent;
    }
    const taxForInterval200000 = 22100;
    return (
      (taxableSalary - this.INCOME_TAX_INTERVAL_3_200000) *
        this.INCOME_TAX_COEFICIENT_2_23Percent +
      taxForInterval200000
    );
  }
}
