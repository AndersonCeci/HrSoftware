import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Salary } from './schema/salary.schema';
import { SalaryDTO } from './salaryDTO/salary.dto';
import { UpdateSalaryDTO } from './salaryDTO/updateSalary.dto';

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
      const salary = await this.salaryModel.findById(id);
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

  async deleteSalary(userId: string): Promise<Salary> {
    try {
      return await this.salaryModel.findOneAndDelete({ employeeID: userId });
    } catch (error) {
      throw new Error('Failed to delete salary');
    }
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

  async addBonus(userId: string, bonus: Record<string, number>): Promise<Salary> {
    try {
      const update = {};
      const bonusMap = new Map(Object.entries(bonus));
      
      bonusMap.forEach((value, key) => {
        update[`bonuses.${key}`] = value;
      });

      return await this.salaryModel.findOneAndUpdate(
        { employeeID: userId },
        { $set: update },
        { new: true, upsert: true }
      );
    } catch (error) {
      throw new Error('Failed to add bonus');
    }
  }
}
