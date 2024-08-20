import { UpdateRecruitmentDto } from './dto/UpdateRecruitments.dto';
import { Injectable } from '@nestjs/common';
import { Recruitment } from './schemas/recruitment.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateRecruitmentDto } from './dto/Recruitments.dto';

@Injectable()
export class RecruitmentService {
  constructor(
    @InjectModel(Recruitment.name) private recruitmentModel: Model<Recruitment>,
  ) {}
  async createRecruitment(
    createRecruitmentDto: CreateRecruitmentDto,
  ): Promise<Recruitment> {
    try {
      const newRecruit = await new this.recruitmentModel(
        createRecruitmentDto,
      ).save();
      return newRecruit;
    } catch (error) {
      throw new Error('Failed to create ');
    }
  }

  async getRecruitments(): Promise<Recruitment[]> {
    return await this.recruitmentModel.find({ isDeleted: false });
  }

  createLookupPipeline(interviewRound: 'firstInterview' | 'secondInterview') {
    return {
      $lookup: {
        from: 'employees',
        let: {
          interviewers: { $ifNull: [`$${interviewRound}.interviewers`, []] },
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $in: [
                  '$_id',
                  {
                    $map: {
                      input: '$$interviewers',
                      as: 'interviewer',
                      in: { $toObjectId: '$$interviewer' },
                    },
                  },
                ],
              },
            },
          },
          {
            $project: {
              _id: 1,
              name: 1,
              surname: 1,
              position: 1,
              email: 1,
              role: 1,
              phoneNumber: 1,
            },
          },
        ],
        as: `${interviewRound}InterviewerDetails`,
      },
    };
  }
  async getRecruitmentWithInterviewerDetails(
    // applicantID: Types.ObjectId,
  ): Promise<Recruitment[]> {
    const pipeline = [
      // { $match: { _id: applicantID } },
      this.createLookupPipeline('firstInterview'),
      this.createLookupPipeline('secondInterview'),
      this.createAddFields('firstInterview'),
      this.createAddFields('secondInterview'),
      {
        $project: {
          name: 1,
          surname: 1,
          email: 1,
          phoneNumber: 1,
          position: 1,
          stage: 1,
          reference: 1,
          cv: 1,
          submittedDate: 1,
          isDeleted: 1,
          deleteDate: 1,
          firstInterview: 1,
          secondInterview: 1,
        },
      },
    ];

    return this.recruitmentModel.aggregate(pipeline);
  }
  createAddFields(interviewRound: 'firstInterview' | 'secondInterview') {
    return {
      $addFields: {
        [`${interviewRound}.interviewers`]: {
          $ifNull: [`$${interviewRound}InterviewerDetails`, []],
        },
      },
    };
  }
  async updateRecruitment(
    id: string,
    updateRecruitmentDto: UpdateRecruitmentDto,
  ) {
    return await this.recruitmentModel.findByIdAndUpdate(
      id,
      updateRecruitmentDto,
      {
        new: true,
      },
    );
  }

  async softDeleteRecruitById(id: string): Promise<Event> {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    return this.recruitmentModel.findByIdAndUpdate(
      id,
      { isDeleted: true, deleteDate: currentDate },
      { new: true },
    );
  }
}
