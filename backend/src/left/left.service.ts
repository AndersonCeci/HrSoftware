import { Injectable, Inject } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { EmployeeService } from 'src/employee/employe.service';
import { Employee } from 'src/employee/schema/employe.schema';
import { Left } from './schema/left.schema';
import { InjectModel } from '@nestjs/mongoose';
import { LeftDto } from './dto/left.dto';

@Injectable()
export class LeftService {
  constructor(
    @Inject(EmployeeService)
    private readonly employeeService: EmployeeService,
    @InjectModel(Left.name)
    private leftModel: mongoose.Model<Left>,
  ) {}

  async findAll(): Promise<Employee[]> {
    return this.leftModel.find();
  }

  getByID(id: string): Promise<Employee | null> {
    return this.employeeService.findOne(id);
  }

  deleteEmployee(id:string) : Promise<Employee | null>{
     return this.employeeService.delete(id)
  }
 
  async copyEmployeeData(id: string): Promise<Left> {
    const employeeData = await this.employeeService.findOne(id);
    
    if (!employeeData) {
      throw new Error('Employee not found');
    }


    const dateObj = new Date();
    const month   = dateObj.getUTCMonth() + 1;
    const day     = dateObj.getUTCDate();
    const year    = dateObj.getUTCFullYear();
    const newDate = `${day}/${month}/${year}`;

    const leftData = new this.leftModel({
      ...employeeData.toObject(),
      deletedAt: newDate,
    });

    await leftData.save();

    await this.employeeService.delete(id);

    return leftData;
  }
}
