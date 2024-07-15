import { RecruitmentService } from './recruitments.service';
import { RecruimentsModule } from 'src/recruitments/recruitments.module';
import {
  Body,
  Controller,
  Post,
  Get,
  UsePipes,
  ValidationPipe,
  Delete,
  Param,
  Patch,
  HttpException,
} from '@nestjs/common';
import { CreateRecruitmentDto } from './dto/Recruiments.dto';
import mongoose from 'mongoose';
import { UpdateRecruitmentDto } from './dto/UpdateRecruiments.dto';

@Controller('recruiments')
export class RecruimentsController {
  constructor(private recruitmentService: RecruitmentService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  createRecruitment(@Body() createRecruitmentDto: CreateRecruitmentDto) {
    console.log(createRecruitmentDto);
    return this.recruitmentService.createRecruitment(createRecruitmentDto);
  }

  @Get()
  getRecruitment() {
    return this.recruitmentService.getRecruitment();
  }
  @Get(':id')
  async getRecruitmentById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Recruitment not found', 404);
    const findRec = await this.recruitmentService.getUserById(id);
    if (!findRec) throw new HttpException('Recruitment not found', 404);

    return findRec;
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
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
      await this.recruitmentService.deleteRecruitment(id);
    if (!deletedRecruitment)
      throw new HttpException('Recruitment not Found', 404);
    return;
  }
}
