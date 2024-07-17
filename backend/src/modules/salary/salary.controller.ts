import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { SalaryService } from './salary.service'; 
import { SalaryDTO } from './salaryDTO/salary.dto';
import { UpdateSalaryDTO } from './salaryDTO/updateSalary.dto';


@Controller('salary')
export class SalaryController {
  constructor(private readonly salaryService: SalaryService) {}

  @Post()
  async create(@Body() salaryDTO: SalaryDTO) {
    return await  this.salaryService.create(salaryDTO);
  }

  @Get()
async getAllSalaries(){
  return await this.salaryService.getAllSalaries()
}

  @Get(":id")
  async findById(@Param("id") id:string) {
    return await this.salaryService.find(id);
  }
  @Put(':userId')
  async updateSalary(
    @Param('userId') userId: string,
    @Body() updateSalaryDto: UpdateSalaryDTO
  ) {
    return await this.salaryService.updateSalary(userId, updateSalaryDto);
  }

  @Put(':userId/bonuses')
  async addBonus(
    @Param('userId') userId: string,
    @Body() bonus: Record<string, number>
  ) {
    return await this.salaryService.addBonus(userId, bonus);
  }
  @Delete(":userId")
  async deleteSalary(
    @Param('userId') userId: string,
  ){
  return await this.salaryService.deleteSalary(userId)
  }
}

