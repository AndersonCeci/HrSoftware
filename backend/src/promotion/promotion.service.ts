import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Promotion } from './schema/promotion.schema';
import { Employee, Position } from 'src/employee/schema/employe.schema';

@Injectable()
export class PromotionService {
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<Employee>,
    @InjectModel(Promotion.name) private promotionModel: Model<Promotion>,
  ) {}

  async promoteEmployee(
    employeeId: string,
    newPosition: Position,
    newSalary: number,
    trainedBy: string,
    isTeamLeader: boolean,
  ): Promise<{ employee: Employee; promotion: Promotion }> {
    const employee = await this.employeeModel.findById(employeeId);

    if (!employee) {
      throw new Error('Employee not found');
    }

    const promotion = new this.promotionModel({
      employee: new Types.ObjectId(employeeId),
      employeeName: `${employee.name} ${employee.surname}`,
      oldPosition: employee.position,
      newPosition: newPosition,
      oldSalary: employee.salary,
      newSalary: newSalary,
      dateOfPromotion: new Date(),
      trainedBy: trainedBy,
      isTeamLeader: isTeamLeader,
    });

    await promotion.save();
    console.log('Promotion created:', promotion);

    employee.position = newPosition;
    employee.salary = newSalary;
    employee.promotionHistory = employee.promotionHistory || [];
    employee.promotionHistory.push(promotion._id as any);

    if (isTeamLeader) {
      await this.employeeModel.findByIdAndUpdate(employeeId, {
        $addToSet: { teamLeaders: employee._id },
      });
    }

    await employee.save();
    console.log('Updated employee:', employee);

    return { employee, promotion };
  }

  async getEmployeePromotionHistory(employeeId: string): Promise<Promotion[]> {
    const employee = await this.employeeModel
      .findById(employeeId)
      .populate('promotionHistory');
    return employee.promotionHistory;
  }

  async getAllPromotionHistories(): Promise<Promotion[]> {
    return this.promotionModel.find().exec();
  }
}
