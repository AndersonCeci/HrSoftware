import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose  from 'mongoose';
import { Salary } from './schema/salary.schema';
import { SalaryDTO } from './dto/salaryDTO/salary.dto';
import {  UpdateSalaryDTO } from './dto/salaryDTO/updateSalary.dto';

@Injectable()
export class SalaryService {
  constructor(@InjectModel(Salary.name) private salaryModel: mongoose.Model<Salary>) {}

  async create(createSalaryDto: SalaryDTO): Promise<Salary> {
    try {
      const createdSalary = new this.salaryModel(createSalaryDto);
      return await createdSalary.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('EmployeeID must be unique');
      }
      throw new Error('Failed to create salary'); 
    }
  }

  async getAllSalaries(): Promise<Salary[]> {
    try {
      return await this.salaryModel.find();
    } catch (error) {
      throw new Error('Failed to fetch salaries');
    }
  }

  async find(id: string): Promise<Salary> {
    try {
      const salary = await this.salaryModel.findById(id,{isDeleted:false});
      if (!salary) {
        throw new NotFoundException('Salary not found');
      }
      return salary;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Failed to find salary');
    }
  }

  // async deleteSalary(userId: string): Promise<Salary> {
  //   try {
  //     return await this.salaryModel.findOneAndDelete({ employeeID: userId });
  //   } catch (error) {
  //     throw new Error('Failed to delete salary');
  //   }
  // }

  async softDeleteSalaryById(id: string): Promise<Event> {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    
    return this.salaryModel.findByIdAndUpdate(
      id, 
      { isDeleted: true, deleteDate: currentDate }, 
      { new: true }
    )
  }

  async updateSalary(userId: string, newSalary: UpdateSalaryDTO): Promise<Salary> {
    try {
      return await this.salaryModel.findOneAndUpdate(
        { employeeID: userId },
        { $set: newSalary },
        { new: true }
      );
    } catch (error) {
      throw new Error('Failed to update salary');
    }
  }

  async clearBonuses(): Promise<void> {
    await this.salaryModel.updateMany({}, { $set: { bonuses: [] } });
  }
}
