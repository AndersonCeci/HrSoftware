import { NotificationsService } from 'src/notificationsGateway/notifications.service';
import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Employee, Position } from './schema/employe.schema';
import { CreateEmployeeDto } from './dto/CreateEmployee.dto';
import { UserService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Role, User } from 'src/users/schemas/user.schema';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CreateNotificationDto } from 'src/notificationsGateway/dto/CreateNotificationDto';
import { NotificationStatus } from 'src/notificationsGateway/notification.schema';
import { InventoryService } from 'src/inventory/inventory.service';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name) private readonly employeeModel: Model<Employee>,
    // @InjectModel(User.name) private readonly userModel: Model<User>,
    @Inject(forwardRef(() => InventoryService))
    private readonly inventoryService: InventoryService,
    private readonly userService: UserService,
    private readonly notificationService: NotificationsService,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    let role: Role;

    switch (createEmployeeDto.position) {
      case Position.JuniorFrontEnd:
      case Position.JuniorBackEnd:
      case Position.SeniorFrontEnd:
      case Position.SeniorBackEnd:
      case Position.FullStack:
      case Position.DevOps:
        role = Role.Employee;
        break;
      case Position.ProjectManager:
        role = Role.ProjectManager;
        break;
      case Position.HR:
        role = Role.HR;
        break;
      default:
        throw new Error('Invalid position');
    }

    const createdEmploye = await new this.employeeModel({
      ...createEmployeeDto,
      role,
      teamLeaders:
        createEmployeeDto.teamLeaders?.map((id) => new Types.ObjectId(id)) ||
        [],
    }).save();

    const fullNameAggregation = await this.employeeModel.aggregate([
      {
        $match: { _id: createdEmploye._id },
      },
      {
        $project: {
          fullName: {
            $concat: [
              { $toUpper: { $substrCP: [`$name`, 0, 1] } },
              {
                $substrCP: [
                  `$name`,
                  1,
                  { $subtract: [{ $strLenCP: `$name` }, 1] },
                ],
              },
              ' ',
              { $toUpper: { $substrCP: [`$surname`, 0, 1] } },
              {
                $substrCP: [
                  `$surname`,
                  1,
                  { $subtract: [{ $strLenCP: `$surname` }, 1] },
                ],
              },
            ],
          },
        },
      },
    ]);

    const updatedEmployee = await this.employeeModel.findByIdAndUpdate(
      createdEmploye._id,
      { fullName: fullNameAggregation[0].fullName },
      { new: true },
    );

    const createUserDto: CreateUserDto = {
      employID: updatedEmployee._id as Types.ObjectId,
      username: `${createEmployeeDto.surname}codevider`,
      password: 'codevider',
      email: createEmployeeDto.email,
      role: role,
      isDeleted: false,
    };

    await this.userService.createUser(createUserDto);
    Logger.log('create');
    return updatedEmployee;
  }

  findAll(): Promise<Employee[]> {
    return this.employeeModel.find().exec();
  }

  async findStatusLength(): Promise<any[]> {
    const employmentData = await this.employeeModel
      .aggregate([
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            status: '$_id',
            count: 1,
          },
        },
      ])
      .exec();

    return employmentData;
  }

  // findLeft(): Promise<Employee[]> {
  //   return this.employeeModel.find().exec();
  // }

  async findOne(id: string) {
    try {
      const employee = await this.employeeModel.findById(id);

      if (!employee) {
        throw new NotFoundException(`Employee with ID ${id} not found`);
      }

      return employee;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Failed to find employee with ID ${id}`,
        error.message,
      );
    }
  }

  update(id: string, updateEmployeeDto: CreateEmployeeDto) {
    return this.employeeModel.findByIdAndUpdate(id, updateEmployeeDto, {
      new: true,
    });
  }

  delete(id: string): Promise<Employee | null> {
    this.inventoryService.cleanUpInventories(id);
    return this.employeeModel.findByIdAndDelete(id);
  }

  async findNameById(id: string): Promise<string | null> {
    const employee = await this.employeeModel.findById(id).exec();
    if (employee) {
      return employee.name;
    }
    return null;
  }

  softDeleteEmployeeById(id: string): Promise<Employee> {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const updatedEmployee = this.employeeModel.findByIdAndUpdate(
      id,
      { isDeleted: true, deleteDate: currentDate },
      { new: true },
    );

    if (updatedEmployee) {
      this.userService.deleteUserByEmployID(id);
    }
    return updatedEmployee;
  }

  async findName(name: string): Promise<Employee | null> {
    return await this.employeeModel.findOne({ username: name }).exec();
  }

  @Cron(CronExpression.EVERY_10_HOURS)
  async handleCron() {
    await this.notifyBirthdayOneDayBefore();
    // await this.notifyOneYearAnniversary();
  }

  async notifyBirthdayOneDayBefore(): Promise<void> {
    const oneDayBefore = new Date();
    oneDayBefore.setDate(oneDayBefore.getDate() + 1);
    oneDayBefore.setHours(0, 0, 0, 0);

    const endOfOneDayBefore = new Date(oneDayBefore);
    endOfOneDayBefore.setHours(23, 59, 59, 999);

    const employeesWithUpcomingBirthdays = await this.employeeModel
      .find({
        birthDay: {
          $gte: oneDayBefore,
          $lte: endOfOneDayBefore,
        },
      })
      .exec();

    for (const employee of employeesWithUpcomingBirthdays) {
      const message = `Reminder: ${employee.name} ${employee.surname}'s birthday is tomorrow!`;

      const createNotificationDto: CreateNotificationDto = {
        reminderTitle: 'Birthday Reminder',
        message,
        isRead: false,
        userId: null,
        path: `/dashboard`,
        status: NotificationStatus.REMINDER,
      };

      await this.notificationService.createNotification(createNotificationDto);
    }
  }

  // async notifyOneYearAnniversary(): Promise<void> {
  //   const oneYearAgo = new Date();
  //   oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  //   oneYearAgo.setHours(0, 0, 0, 0);

  //   const endOfDay = new Date(oneYearAgo);
  //   endOfDay.setHours(23, 59, 59, 999);

  //   const employeesWithAnniversary = await this.employeeModel
  //     .find({
  //       startingDate: {
  //         $gte: oneYearAgo,
  //         $lte: endOfDay,
  //       },
  //     })
  //     .exec();

  //   const hrUser = await this.userModel.findOne({ role: Role.HR }).exec();

  //   if (!hrUser) {
  //     throw new Error('No HR user found');
  //   }

  //   for (const employee of employeesWithAnniversary) {
  //     const createNotificationDto: CreateNotificationDto = {
  //       message: `Congratulations to ${employee.fullName} for one year at the company!`,
  //       isRead: false,
  //       userId: new Types.ObjectId(hrUser._id),
  //       path: `/dashboard`,
  //       status: NotificationStatus.REMINDER,
  //     };
  //     await this.notificationService.createNotification(createNotificationDto);
  //   }
  // }

  async searchEmployee(
    name?: string,
    surname?: string,
  ): Promise<Employee[] | null> {
    try {
      const query: any = {};
      if (name) {
        query.name = { $regex: new RegExp(name, 'i') };
      }
      if (surname) {
        query.surname = { $regex: new RegExp(surname, 'i') };
      }
      const employees = await this.employeeModel.find(query);

      return employees.length > 0 ? employees : null;
    } catch (error) {
      throw new Error('An error occurred while searching for employees.');
    }
  }

  // async getTeamLeaders(): Promise<Employee[]> {
  //   const employeesWithTeamLeaders = await this.employeeModel
  //     .aggregate([
  //       {
  //         $match: {
  //           teamLeaders: { $exists: true, $not: { $size: 0 } },
  //         },
  //         $project: {},
  //       },
  //     ])
  //     .exec();

  //   return employeesWithTeamLeaders;
  // }

  async getEmployeesAndTeamLeaders(): Promise<any> {
    const results = await this.employeeModel
      .aggregate([
        {
          $facet: {
            teamLeaders: [
              {
                $match: {
                  teamLeaders: { $exists: true, $not: { $size: 0 } },
                },
              },
              {
                $unwind: '$teamLeaders',
              },
              {
                $lookup: {
                  from: 'employees',
                  localField: 'teamLeaders',
                  foreignField: '_id',
                  as: 'teamLeaderDetails',
                },
              },
              {
                $unwind: '$teamLeaderDetails',
              },
              {
                $group: {
                  _id: '$teamLeaderDetails._id',
                  teamLeaderName: { $first: '$teamLeaderDetails.name' },
                  teamLeaderProfilePhoto: {
                    $first: '$teamLeaderDetails.profilePhoto',
                  },
                  teamLeaderPosition: {
                    $first: '$teamLeaderDetails.position',
                  },
                  employees: {
                    $push: {
                      id: '$_id',
                      name: '$name',
                      position: '$position',
                      profilePhoto: '$profilePhoto',
                    },
                  },
                },
              },
            ],
            hrAndCeo: [
              {
                $match: {
                  role: { $in: ['hr', 'ceo'] },
                },
              },
              {
                $project: {
                  id: '$_id',
                  name: 1,
                  position: 1,
                  role: 1,
                  profilePhoto: 1,
                },
              },
            ],
          },
        },
      ])
      .exec();

    return results;
  }

  async getTeamLeaders(): Promise<Employee[]> {
    const teamLeaders = await this.employeeModel
      .aggregate([
        {
          $lookup: {
            from: 'promotions',
            localField: 'promotionHistory',
            foreignField: '_id',
            as: 'promotions',
          },
        },
        {
          $match: {
            'promotions.isTeamLeader': true,
          },
        },
      ])
      .exec();

    return teamLeaders;
  }

  async findByIds(ids: string[]): Promise<Employee[]> {
    try {
      console.warn('herererrerererrer tetstst', ids);
      const objectIds = ids.map((id) => {
        if (!Types.ObjectId.isValid(id)) {
          throw new BadRequestException(`Invalid ID format: ${id}`);
        }
        return new Types.ObjectId(id);
      });

      const employees = await this.employeeModel.find({
        _id: { $in: objectIds },
      });

      if (employees.length === 0) {
        throw new NotFoundException('No employees found with the provided IDs');
      }

      return employees;
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      } else {
        throw new InternalServerErrorException(
          'Failed to retrieve employees. Please try again.',
        );
      }
    }
  }
}
