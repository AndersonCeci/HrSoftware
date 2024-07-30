import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { SalaryService } from './salary.service';
import { SalaryDTO } from './dto/salaryDTO/salary.dto';
import { UpdateSalaryDTO } from './dto/salaryDTO/updateSalary.dto';
import { Types } from 'mongoose';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Controller('salary')
export class SalaryController {
  constructor(private readonly salaryService: SalaryService) {}

  @Post()
  async create(@Body() salaryDTO: SalaryDTO) {
    return await this.salaryService.create(salaryDTO);
  }

  @Get()
  async getAllNew(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('startDate') startDate?: Date,
    @Query('endDate') endDate?: Date,
    @Query('name') name?: string,
  ) {
  
    const pageNumber = parseInt(page.toString(), 10);
    const limitNumber = parseInt(limit.toString(), 10);
    const filter = { startDate, endDate, name };
    return await this.salaryService.getSalariesWithEmployeeInfo(
      pageNumber,
      limitNumber,
      filter,
    );
  }

  @Put(':salaryID')
  async updateSalary(
    @Param('salaryID') salaryID: string,
    @Body() updateSalaryDto: UpdateSalaryDTO,
  ) {
   
   

   
    const dto = plainToClass(UpdateSalaryDTO, updateSalaryDto);
    const errors = await validate(dto);
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    }

    console.log('Received data:', { salaryID,  updateSalaryDto });

    return await this.salaryService.updateSalary(
      new Types.ObjectId(salaryID),
      dto,
    );
  }


  @Delete(':userId')
  async deleteSalary(@Param('userId') userId: string) {
    return await this.salaryService.deleteSalary(userId);
  }
}
