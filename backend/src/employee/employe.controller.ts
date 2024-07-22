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
  create ( @Body() createEmployeeDto: CreateEmployeeDto )
  {
    console.log(this.employeeService.create(createEmployeeDto))
    return this.employeeService.create(createEmployeeDto);
  }

  @Get()
   findAll(): Promise<Employee[]> {
    return this.employeeService.findAll();
  }

  // @Get('/left')
  //  findLeft(): Promise<Employee[]> {
  //   return this.employeeService.findLeft();
  // }

  @Get(':id')
   findOne(@Param('id') id: string): Promise<Employee | null> {
    return this.employeeService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: any,
  ): Promise<Employee | null> {
    return this.employeeService.update(id, updateEmployeeDto);
  }

  @Delete(':id')
  async softDeleteById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 404);
    const result = await this.employeeService.softDeleteAssetById(id);
    if (!result) {
      throw new HttpException('No assets found for the given ID', 404);
    }
    return result;
  }
}
