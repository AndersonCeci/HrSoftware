import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { SalaryService } from './salary.service'; 
import { SalaryDTO } from './dto/salaryDTO/salary.dto';
import {  UpdateSalaryDTO } from './dto/salaryDTO/updateSalary.dto';


@Controller('salary')
export class SalaryController {
  constructor(private readonly salaryService: SalaryService) {}

  @Post()
  async create(@Body() salaryDTO: SalaryDTO) {
    return await this.salaryService.create(salaryDTO);
  }

  @Get()
  async getAllSalaries() {
    return await this.salaryService.getAllSalaries();
  }

  @Get(":id")
  async findById(@Param("id") id: string) {
    return await this.salaryService.find(id);
  }

  @Put(':userId')
  async updateSalary(
    @Param('userId') userId: string,
    @Body() updateSalaryDto: UpdateSalaryDTO
  ) {
    console.log(updateSalaryDto);
    return await this.salaryService.updateSalary(userId, updateSalaryDto);
  }



  @Delete(":userId")
  async deleteSalary(
    @Param('userId') userId: string,
  ) {
    return await this.salaryService.deleteSalary(userId);
  }
}
