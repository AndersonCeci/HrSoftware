import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Employee } from './schema/employe.schema';
import { CreateEmployeeDto } from './dto/CreateEmployee.dto';
import { UserService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name) private readonly employeeModel: Model<Employee>,
    private readonly userService: UserService,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const createdEmploy = await new this.employeeModel(
      createEmployeeDto,
    ).save();

    const createUserDto: CreateUserDto = {
      employID: createdEmploy._id as Types.ObjectId,
      username: createEmployeeDto.username,
      password: createEmployeeDto.password,
      email: createEmployeeDto.email,
      role: createEmployeeDto.position,
      isDeleted: false,
    };

    await this.userService.createUser(createUserDto);
    return createdEmploy;
  }

  findAll(): Promise<Employee[]> {
    return this.employeeModel.find().exec();
  }

  findLeft(): Promise<Employee[]> {
    return this.employeeModel.find().exec();
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

  softDeleteEmployeeById(id: string): Promise<Employee> {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const updatedEmployee = this.employeeModel.findByIdAndUpdate(
      id,
      { isDeleted: true, deleteDate: currentDate },
      { new: true },
    );
    if (updatedEmployee) {
      this.userService.deleteUserByEmployID(id);
    }

    return updatedEmployee;
  }

  // async getUsernames(): Promise<string[]> {
  //   const employees = await this.employeeModel
  //     .find({ isDeleted: false })
  //     .select('username')
  //     .exec();
  //   const usernameArray = employees.map((employee) => employee.username);
  //   return usernameArray;
  // }

  async getUsernames(): Promise<{ id: string; username: string }[]> {
    const employees = await this.employeeModel
      .find({ isDeleted: false })
      .select('_id username')
      .exec();

    const result = employees.map((employee) => ({
      id: employee._id.toString(),
      username: employee.username,
    }));

    return result;
  }
}
