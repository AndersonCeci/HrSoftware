import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Types } from 'mongoose';
import { Salary } from '../schema/salary.schema';
import { SalaryDTO } from '../dto/salaryDTO/salary.dto';
import { UpdateSalaryDTO } from '../dto/salaryDTO/updateSalary.dto';
import { PaginatedDTO } from '../../../paginationDTO/paginated.dto';
import { ExportSalaryDTO } from '../dto/salaryDTO/export-salary.dto';
import { EmployeeService } from 'src/employee/employe.service';
import { Employee } from 'src/employee/schema/employe.schema';

@Injectable()
export class SalaryService {
  constructor(
    @InjectModel(Salary.name) private salaryModel: mongoose.Model<Salary>,
    private readonly employeeService: EmployeeService,
  ) {}

  async create(createSalaryDto: SalaryDTO): Promise<Salary> {
    try {
      const createdSalary = new this.salaryModel({
        ...createSalaryDto,
        employeeID: new Types.ObjectId(createSalaryDto.employeeID),
        dateTaken: new Date(createSalaryDto.dateTaken),
      });
      return await createdSalary.save();
    } catch (error) {
      console.log(error);

      if (error.code === 11000) {
        const duplicateKey = Object.keys(error.keyPattern).join(', ');
        throw new ConflictException(
          `A salary record with the same ${duplicateKey} already exists.`,
        );
      }
      throw new InternalServerErrorException('Failed to create salary');
    }
  }

  async getAllSalaries(): Promise<Salary[]> {
    try {
      return await this.salaryModel.find();
    } catch (error) {
      throw new ConflictException('Failed to fetch salaries');
    }
  }

  async find(id: string): Promise<Salary> {
    try {
      const salary = await this.salaryModel.findById(id, { isDeleted: false });
      if (!salary) {
        throw new NotFoundException('Salary not found');
      }
      return salary;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Failed to find salary');
    }
  }

  async deleteSalary(userId: string): Promise<Salary> {
    try {
      return await this.salaryModel.findOneAndDelete({ employeeID: userId });
    } catch (error) {
      throw new Error('Failed to delete salary');
    }
  }

  async softDeleteSalaryById(id: string): Promise<Event> {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    return this.salaryModel.findByIdAndUpdate(
      id,
      { isDeleted: true, deleteDate: currentDate },
      { new: true },
    );
  }

  async updateSalary(
    salaryID: Types.ObjectId,
    newSalary: UpdateSalaryDTO,
  ): Promise<Salary> {
    try {
      const { employeeID, ...otherFields } = newSalary;
      const updatedSalary = await this.salaryModel.findByIdAndUpdate(
        salaryID,
        { $set: otherFields },
        { new: true },
      );
      if (!updatedSalary) {
        throw new Error('Salary not found');
      }
      return updatedSalary;
    } catch (error) {
      throw new InternalServerErrorException('Failed to update salary');
    }
  }

  async getPrevSalaryDataPerEmployee(
    employeeID: Types.ObjectId,
  ): Promise<Salary | null> {
    try {
      const { start, end } = this.getPreviousMonthDateRange();
      return await this.salaryModel.findOne({
        employeeID: employeeID,
        dateTaken: { $gte: start, $lte: end },
      });
    } catch (error) {
      throw new InternalServerErrorException(`Not found: ${error.message}`);
    }
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
            paid: 1,
            healthInsuranceCompany: 1,
            socialInsuranceCompany: 1,
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

  async createSalariesPerMonth(): Promise<void> {
    try {
      const employees: Employee[] = await this.employeeService.findAll();

      for (const employee of employees) {
        const prevSalaryData = await this.getPrevSalaryDataPerEmployee(
          employee._id as Types.ObjectId,
        );

        if (prevSalaryData) {
          const newSalary: SalaryDTO = {
            employeeID: employee._id as Types.ObjectId,
            dateTaken: new Date(),
            netSalary: prevSalaryData.netSalary,
            workDays: prevSalaryData.workDays,
            bonuses: [],
            socialSecurityContributions:
              prevSalaryData.socialSecurityContributions,
            healthInsurance: prevSalaryData.healthInsurance,
            grossSalary: prevSalaryData.grossSalary,
            total: prevSalaryData.total,
            paid: false,
            isDeleted: false,
            incomeTax: prevSalaryData.incomeTax,
            healthInsuranceCompany: prevSalaryData.healthInsuranceCompany,
            socialInsuranceCompany: prevSalaryData.socialInsuranceCompany,
          };

          await this.create(newSalary);
        } else {
          console.warn(
            `No previous salary data found for employee ${employee._id}`,
          );
        }
      }
    } catch (error) {
      throw new InternalServerErrorException('Failed to create salaries');
    }
  }

  private getPreviousMonthDateRange(): { start: Date; end: Date } {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();

    const startMonth = month === 0 ? 11 : month - 1;
    const startYear = month === 0 ? year - 1 : year;

    const startDate = new Date(startYear, startMonth, 1);
    const endDate = new Date(startYear, month, 0);

    return { start: startDate, end: endDate };
  }
}
