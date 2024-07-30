import { UploadService } from './../upload/upload.service';
import { UploadModule } from './../upload/upload.module';
import { UpdateRecruitmentDto } from './dto/UpdateRecruiments.dto';
import { RecruimentsModule } from 'src/recruitments/recruitments.module';
import { Injectable } from '@nestjs/common';
import { Recruitment } from './schemas/recruiment.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRecruitmentDto } from './dto/Recruiments.dto';

@Injectable()
export class RecruitmentService {
  constructor(
    @InjectModel(Recruitment.name) private recruitmentModel: Model<Recruitment>,
  ) {}
  createRecruitment(createRecruitmentDto: CreateRecruitmentDto) {
    const newRecruit = new this.recruitmentModel(createRecruitmentDto);
    return newRecruit.save();
  }

  getRecruitment() {
    return this.recruitmentModel.find();
  }

  getUserById(id: string) {
    return this.recruitmentModel.findById(id);
  }

  updateRecruitment(id: string, updateRecruitmentDto: UpdateRecruitmentDto) {
    return this.recruitmentModel.findByIdAndUpdate(id, updateRecruitmentDto, {
      new: true,
    });
  }

  deleteRecruitment(id: string) {
    return this.recruitmentModel.findByIdAndDelete(id);
  }
}
