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
} from '@nestjs/common';
import { EmployeeService } from './employe.service';
import { Employee } from './schema/employe.schema';
import { CreateEmployeeDto } from './dto/CreateEmployee.dto';

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
  async remove(@Param('id') id: string): Promise<Employee | null> {
    return this.employeeService.delete(id);
  }
}
