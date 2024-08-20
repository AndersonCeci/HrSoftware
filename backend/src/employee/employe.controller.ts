import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ValidationPipe,
  UsePipes,
  HttpException,
  Patch,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { EmployeeService } from './employe.service';
import { Employee } from './schema/employe.schema';
import { CreateEmployeeDto } from './dto/CreateEmployee.dto';
import mongoose from 'mongoose';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.create(createEmployeeDto);
  }

  @Get('team-leaders')
  async getTeamLeaders(): Promise<Employee[]> {
    return this.employeeService.getTeamLeaders();
  }

  @Get('/search')
  async search(
    @Query('name') name?: string,
    @Query('surname') surname?: string,
  ) {
    try {
      const result = await this.employeeService.searchEmployee(name, surname);
      if (!result) {
        throw new NotFoundException(
          'No employees found matching the given criteria.',
        );
      }
      return result;
    } catch (error) {
      throw new NotFoundException(
        error.message || 'An error occurred while searching for employees.',
      );
    }
  }

  @Get()
  findAll(): Promise<Employee[]> {
    return this.employeeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const test = this.employeeService.findOne(id);
    return test;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: any,
  ): Promise<Employee | null> {
    return this.employeeService.update(id, updateEmployeeDto);
  }

  @Delete(':id')
  async softDeleteEmployById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 404);
    const result = await this.employeeService.softDeleteEmployeeById(id);
    if (!result) {
      throw new HttpException('No employee found for the given ID', 404);
    }
    return result;
  }
}