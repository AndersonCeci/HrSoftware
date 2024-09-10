import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDayOffDto } from './dto/CreateDayOff.dto';
import { DayOff } from './schema/dayoff.schema';
import { EmployeeService } from 'src/employee/employe.service';
import { UpdateDayOffDto } from './dto/UpdateDayOff.dto';
import { CreateNotificationDto } from 'src/notificationsGateway/dto/CreateNotificationDto';
import { UserService } from 'src/users/users.service';
import { NotificationsService } from 'src/notificationsGateway/notifications.service';
import { Role, User } from 'src/users/schemas/user.schema';

@Injectable()
export class DayoffService {
  constructor(
     @InjectModel( DayOff.name ) private dayoffModel: Model<DayOff>,
     @InjectModel(User.name) private userModel: Model<User>,
    private readonly employeeService: EmployeeService,
    private readonly notificationService: NotificationsService,
  ) {}

  async createDayOff(createDayOff: CreateDayOffDto) {
    const employee = await this.employeeService.findOne(
      createDayOff.employeeId,
    );
    if (!employee) {
      throw new HttpException("The ID of the employee doesn't exist", 404);
    }

    const employeeName = await this.employeeService.findNameById(
      createDayOff.employeeId,
    );
    if (!employeeName) {
      throw new HttpException("The name of the employee doesn't exist", 404);
    }

    let totalDays: number;
    if (!createDayOff.EndTime) {
      createDayOff.EndTime = createDayOff.StartTime;
      createDayOff.totalDays = 1;
      totalDays = createDayOff.totalDays;
    } else {
      totalDays = this.calculateTotalDays(
        createDayOff.StartTime,
        createDayOff.EndTime,
      );
    }

    const createdDayoff = new this.dayoffModel({
      ...createDayOff,
      EmployeeName: employeeName,

      totalDays,
    });

    const hrUsers = await this.userModel.find({ role: Role.HR }).exec();

    hrUsers.forEach(async (hrUser) => {
      const createNotification: CreateNotificationDto = {
        message: `A new day off request has been created by ${employeeName}.`,
        isRead: false,
        userId: hrUser.employID,
        path: '/dayoff/requestedLeave',
      };
      await this.notificationService.createNotification(createNotification);
    });

    return createdDayoff.save();
  }

  async findAll(): Promise<DayOff[]> {
    return this.dayoffModel
      .find({ isDeleted: false})
      .populate('EmployeeName', 'name')
      .exec();
  }
  async accepted(): Promise<DayOff[]> {
    return this.dayoffModel
      .find({ isApproved: true })
      .populate('EmployeeName', 'name')
      .exec();
  }

  private calculateTotalDays(startDate: Date, endDate: Date): number {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const differenceInTime = end.getTime() - start.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);

    return differenceInDays;
  }

  async softDeleteDayOffById(id: string): Promise<DayOff> {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    return this.dayoffModel
      .findByIdAndUpdate(
        id,
        { isDeleted: true, deleteDate: currentDate },
        { new: true },
      )
      .exec();
  }

  async approved(id: string): Promise<DayOff> {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    return this.dayoffModel
      .findByIdAndUpdate(
        id,
        { isApproved: true, approvedDate: currentDate },
        { new: true },
      )
      .exec();
  }

  async updateDayOff(
    id: string,
    updateDayOffDto: UpdateDayOffDto,
  ): Promise<DayOff> {
    return this.dayoffModel
      .findByIdAndUpdate(id, updateDayOffDto, { new: true })
      .exec();
  }
}
