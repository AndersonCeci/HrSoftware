import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Types } from 'mongoose';
import { Salary } from './schema/salary.schema';
import { SalaryDTO } from './dto/salaryDTO/salary.dto';
import { UpdateSalaryDTO } from './dto/salaryDTO/updateSalary.dto';
import { ValidationError } from 'class-validator';
import { PaginatedDTO } from '../../paginationDTO/paginated.dto';
import { ExportSalaryDTO } from './dto/salaryDTO/export-salary.dto';

@Injectable()
export class SalaryService {
  constructor(
    @InjectModel(Salary.name) private salaryModel: mongoose.Model<Salary>,
  ) {}

  async create(createSalaryDto: SalaryDTO): Promise<Salary> {
    try {
      const salarySchema = new this.salaryModel({
        ...createSalaryDto,
        employeeID: new Types.ObjectId(createSalaryDto.employeeID),
      });
      const createdSalary = new this.salaryModel(salarySchema);
      return await createdSalary.save();
    } catch (error) {
      console.log(error);

      if (error instanceof ValidationError) {
        throw new ValidationError();
      }

      if (error.code === 11000) {
        const duplicateKey = Object.keys(error.keyPattern).join(', ');
        throw new ConflictException(
          `A salary record with the same ${duplicateKey} already exists.`,
        );
      }

      throw new InternalServerErrorException('Failed to create salary');
    }
  }

  async deleteSalary(userId: string): Promise<Salary> {
    try {
      return await this.salaryModel.findOneAndDelete({ employeeID: userId });
    } catch (error) {
      throw new Error('Failed to delete salary');
    }
  }

  async updateSalary(
    salaryID: Types.ObjectId,
    
    newSalary: UpdateSalaryDTO,
  ): Promise<Salary> {
    try {
      return await this.salaryModel.findByIdAndUpdate(
        {
          _id: salaryID,
         
        },
        { $set: newSalary },
        { new: true },
      );
    } catch (error) {
      console.error('Failed to update salary:', error);
      throw new Error('Failed to update salary');
    }
  }

  async clearBonuses(): Promise<void> {
    await this.salaryModel.updateMany({}, { $set: { bonuses: [] } });
  }

  async getSalariesWithEmployeeInfo(
    page: number,
    limit: number,
    filter: {
      startDate?: Date;
      endDate?: Date;
      employeeID?: string;
      name?: string;
    },
  ): Promise<PaginatedDTO<ExportSalaryDTO[]>> {
    const matchStage: any = {};

    if (filter.startDate) {
      matchStage.dateTaken = { $gte: new Date(filter.startDate) };
    }

    if (filter.endDate) {
      if (!matchStage.dateTaken) {
        matchStage.dateTaken = {};
      }
      matchStage.dateTaken.$lte = new Date(filter.endDate);
    }

    if (filter.employeeID) {
      matchStage.employeeID = new Types.ObjectId(filter.employeeID);
    }

    const skip = (page - 1) * limit;
    console.log('matchStage', matchStage);
    const data = await this.salaryModel
      .aggregate([
        { $match: matchStage },
        {
          $lookup: {
            from: 'employees',
            localField: 'employeeID',
            foreignField: '_id',
            as: 'employeeDetails',
          },
        },
        { $unwind: '$employeeDetails' },
        {
          $match: filter.name
            ? { 'employeeDetails.name': new RegExp(filter.name, 'i') }
            : {},
        },
        {
          $project: {
            employeeID: 1,
            dateTaken: 1,
            netSalary: 1,
            workDays: 1,
            bonuses: 1,
            socialSecurityContributions: 1,
            healthInsurance: 1,
            grossSalary: 1,
            total: 1,
            paid:1,
            'employeeDetails.name': 1,
            'employeeDetails.surname': 1,
          },
        },
        { $sort: { dateTaken: -1 } },
      ])
      .skip(skip)
      .limit(limit);

    const itemCount = await this.salaryModel.countDocuments(matchStage);

    return new PaginatedDTO<ExportSalaryDTO[]>(data, page, limit, itemCount);
  }
}
