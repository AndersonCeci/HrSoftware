import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee } from './schema/employe.schema';
import { CreateEmployeeDto } from './dto/CreateEmployee.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name) private readonly employeeModel: Model<Employee>,
  ) {}

  create(createEmployeeDto: CreateEmployeeDto) {
    const createdEmploy = new this.employeeModel(createEmployeeDto).save();
    return createdEmploy;
  }

  findAll(): Promise<Employee[]> {
    return this.employeeModel.find({ isDeleted: false }).exec();
  }
  

  findLeft(): Promise<Employee[]> {
    return this.employeeModel.find({ isDeleted: true }).exec();
  }


  findOne(id: string): Promise<Employee | null> {
    return this.employeeModel.findById(id).exec();
  }


  update(id: string, updateEmployeeDto: CreateEmployeeDto) {
    return this.employeeModel.findByIdAndUpdate(id, updateEmployeeDto, {
      new: true,
    });
  }

  delete(id: string): Promise<Employee | null> {
    return this.employeeModel.findByIdAndDelete(id);
  }

  softDeleteAssetById(id: string): Promise<Employee> {
    return this.employeeModel
      .findByIdAndUpdate(id, { isDeleted: true }, { new: true })
      .exec();
  }

  async getUsernames(): Promise<string[]> {
    const employees = await this.employeeModel.find( { isDeleted: false } ).select( 'username' ).exec();
    const usernameArray = employees.map((employee) => employee.username);
    return usernameArray;
  }

  async searchEmployee(name?: string, surname?: string): Promise<Employee[] | null> {
    try {
      const query: any = {};
      if (name) {
        query.name = { $regex: new RegExp(name, 'i') };
      }
      if (surname) {
        query.surname = { $regex: new RegExp(surname, 'i') };
      }
      const employees = await this.employeeModel.find(query);
  
      return employees.length > 0 ? employees : null;
    } catch (error) {
      throw new Error('An error occurred while searching for employees.');
    }
  }
  
  
  }
