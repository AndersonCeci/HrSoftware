import { UpdateRecruitmentDto } from './dto/UpdateRecruitments.dto';
import { Injectable } from '@nestjs/common';
import {
  OfferMade,
  Recruitment,
  RecruitmentStage,
} from './schemas/recruitment.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateRecruitmentDto } from './dto/Recruitments.dto';
import { PaginatedDTO } from 'src/paginationDTO/paginated.dto';
import { EventsService } from 'src/modules/events/events.service';
import { Status } from 'src/modules/events/schema/events.schema';

@Injectable()
export class RecruitmentService {
  constructor(
    @InjectModel(Recruitment.name) private recruitmentModel: Model<Recruitment>,
    private readonly eventsService: EventsService,
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
      throw new Error(`Failed to create ${error}`);
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
    console.log('Update DTO:', updateRecruitmentDto);
    try {
      const updatedRecruitment = await this.recruitmentModel.findByIdAndUpdate(
        new Types.ObjectId(id),
        updateRecruitmentDto,
        { new: true },
      );

      let interviewData;
      if (updateRecruitmentDto.stage === RecruitmentStage.FirstInterview) {
        interviewData = updateRecruitmentDto.firstInterview;
      } else if (
        updateRecruitmentDto.stage === RecruitmentStage.SecondInterview
      ) {
        interviewData = updateRecruitmentDto.secondInterview;
      }

      if (interviewData) {
        console.log('herererertrrereryrfygdfwgjd');
        console.log('Creating event with data:', {
          title: `Interview scheduled for ${updateRecruitmentDto.stage}`,
          startDate: interviewData.date || new Date(),
          endDate: interviewData.date,
          startTime: interviewData.date,
          endTime: interviewData.date,
          location: interviewData.location || '',
          creatorId: interviewData.interviewers[0],
          invitees: interviewData.interviewers,
          status: Status.Scheduled,
          isDeleted: false,
        });
        const event = await this.eventsService.create({
          title: `Interview scheduled for ${updateRecruitmentDto.stage}`,
          startDate: interviewData.date ?? new Date(),
          endDate: interviewData.date ?? new Date(),
          startTime: interviewData.date ?? new Date(),
          endTime: interviewData.date ?? new Date(),
          location: interviewData.location ?? '',
          creatorId: interviewData.interviewers[0] ?? '',
          invitees: interviewData.interviewers ?? '',
          status: Status.Scheduled,
          isDeleted: false,
        });
        console.log('Event Created:', event);
      }

      return updatedRecruitment;
    } catch (error) {
      throw new Error('Failed to update recruitment: ' + error);
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
}
