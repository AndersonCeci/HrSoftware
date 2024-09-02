import { RecruitmentService } from './recruitments.service';
import {
  Body,
  Controller,
  Post,
  Get,
  Delete,
  Param,
  HttpException,
  Query,
  Put,
} from '@nestjs/common';
import { CreateRecruitmentDto } from './dto/Recruitments.dto';
import mongoose, { Types } from 'mongoose';
import { UpdateRecruitmentDto } from './dto/UpdateRecruitments.dto';

@Controller('recruitments')
export class RecruitmentsController {
  constructor(private recruitmentService: RecruitmentService) {}

  @Post()
  createRecruitment(@Body() createRecruitmentDto: CreateRecruitmentDto) {
    return this.recruitmentService.createRecruitment(createRecruitmentDto);
  }

  @Get()
  async getRecruitments(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('filters') filters: any,
  ) {
    try {
      if (!filters) {
        filters = {};
      } else {
        for (const key in filters) {
          if (filters[key]) {
            filters[key] = { $regex: new RegExp(filters[key], 'i') };
          }
        }
      }
      const pageNo = parseInt(page.toString());
      const limitNo = parseInt(limit.toString());
      const data =
        await this.recruitmentService.getRecruitmentWithInterviewerDetails(
          pageNo,
          limitNo,
          filters,
        );
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  @Put(':id')
  async updateRecruitment(
    @Param('id') id: string,
    @Body() updateRecruitmentDto: UpdateRecruitmentDto,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Id Invalid', 400);
    const updatedRecruitment = await this.recruitmentService.updateRecruitment(
      id,
      updateRecruitmentDto,
    );
    if (!updatedRecruitment)
      throw new HttpException('Recruitment not Found', 404);
    return updatedRecruitment;
  }

  @Delete(':id')
  async deleteRecruitment(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Id Invalid', 400);
    const deletedRecruitment =
      await this.recruitmentService.softDeleteRecruitById(id);
    if (!deletedRecruitment)
      throw new HttpException('Recruitment not Found', 404);
    return;
  }
}
