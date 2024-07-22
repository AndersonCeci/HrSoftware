import { Injectable } from '@nestjs/common';
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
    const createdEmployee = new this.employeeModel(createEmployeeDto);
    return createdEmployee.save();
  }


  findAll(): Promise<Employee[]> {
    return this.employeeModel.find({ isDeleted: false}).exec();
  }

  

   findLeft(): Promise<Employee[]> {
     return this.employeeModel.find({ isDeleted: true}).exec();
   }

  findOne(id: string): Promise<Employee | null> {
    return this.employeeModel.findById(id).exec();
  }

  update(id: string, updateEmployeeDto: any): Promise<Employee | null> {
    return this.employeeModel
      .findByIdAndUpdate(id, updateEmployeeDto, { new: true })
      .exec();
  }
  delete(id:string): Promise<Employee | null>{
     return this.employeeModel.findByIdAndDelete(id)
  }
 
  softDeleteAssetById(id: string): Promise<Employee> {
    return this.employeeModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true }).exec();
  }
}
