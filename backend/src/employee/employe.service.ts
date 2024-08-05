import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Employee, Position } from './schema/employe.schema';
import { CreateEmployeeDto } from './dto/CreateEmployee.dto';
import { UserService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Role } from 'src/users/schemas/user.schema';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name) private readonly employeeModel: Model<Employee>,
    private readonly userService: UserService,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    let role: Role;

    switch (createEmployeeDto.position) {
      case Position.JuniorFrontEnd:
      case Position.JuniorBackEnd:
      case Position.SeniorFrontEnd:
      case Position.SeniorBackEnd:
      case Position.FullStack:
      case Position.DevOps:
        role = Role.Employee;
        break;
      case Position.ProjectManager:
        role = Role.ProjectManager;
        break;
      default:
        throw new Error('Invalid position');
    }

    const employeeData = { ...createEmployeeDto, role };

    const createdEmploy = await new this.employeeModel(employeeData).save();

    const createUserDto: CreateUserDto = {
      employID: createdEmploy._id as Types.ObjectId,
      username: createEmployeeDto.surname + 'codevider',
      password: 'codevider',
      email: createEmployeeDto.email,
      role: role,
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

  async getUsernames(): Promise<{ id: string; username: string }[]> {
    const employees = await this.employeeModel
      .find({ deleteDate: false })
      .select('_id username')
      .exec();

    const result = employees.map((employee) => ({
      id: employee._id.toString(),
      username: employee.username,
    }));

    return result;
  }
}
