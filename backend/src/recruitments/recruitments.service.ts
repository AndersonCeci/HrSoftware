import { UpdateRecruitmentDto } from './dto/UpdateRecruitments.dto';
import { Injectable } from '@nestjs/common';
import { OfferMade, Recruitment } from './schemas/recruitment.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateRecruitmentDto } from './dto/Recruitments.dto';
import { PaginatedDTO } from 'src/paginationDTO/paginated.dto';

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

  async getRecruitments() {
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
    page: number,
    limit: number,
    filters: any,
  ) {
    const skip = (page - 1) * limit;
    const pipeline = [
      {
        $match: filters,
      },
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
          offerMade: 1,
        },
      },
    ];
    const itemCount = await this.recruitmentModel.countDocuments();
    const data = await this.recruitmentModel
      .aggregate(pipeline)
      .skip(skip)
      .limit(limit);
    return new PaginatedDTO<any>(data, page, limit, itemCount);
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
    try {
      const res = await this.recruitmentModel.findByIdAndUpdate(
        new Types.ObjectId(id),
        updateRecruitmentDto,
        {
          new: true,
        },
      );
      console.log(res);
      return res;
    } catch (error) {
      throw new Error(error);
    }
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
  async getApplicationsPerMonth() {
    const year = new Date().getFullYear();

    const startOfYear = new Date(`${year}-01-01T00:00:00.000Z`);
    const endOfYear = new Date(`${year + 1}-01-01T00:00:00.000Z`);

    const dataset = await this.recruitmentModel.aggregate([
      {
        $match: {
          submittedDate: {
            $gte: startOfYear,
            $lt: endOfYear,
          },
        },
      },
      {
        $group: {
          _id: { $month: '$submittedDate' },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);
    const allMonths = Array.from({ length: 12 }, (_, i) => ({
      month: i,
      count: 0,
    }));

    const result = allMonths.map((monthObj) => {
      const existing = dataset.find((item) => item._id === monthObj.month);
      return {
        label: monthObj.month,
        value: existing ? existing.count : 0,
      };
    });

    return result;
  }
}
