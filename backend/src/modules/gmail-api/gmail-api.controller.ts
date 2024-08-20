import {
  BadRequestException,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { GmailApiService } from './gmail-api.service';
import { SchedulerDTO } from 'src/schedule/schedulerDTO/scheduler.dto';
import { SchedulerService } from 'src/schedule/scheduler.service';
import { GaxiosError } from 'gaxios';

// @Roles(['hr', 'ceo'])
@Controller('gmail-api')
export class GmailApiController {
  constructor(
    private readonly gmailService: GmailApiService,
    private readonly scheduler: SchedulerService,
  ) {}

  @Get('messages')
  async getMessages(
    @Query('subjectFilter') subjectFilter: string | null,
    @Query('startDate') startDate: string | null,
    @Query('endDate') endDate: string | null,
    @Query('step') step: string,
  ) {
    if (!startDate || !endDate) {
      throw new BadRequestException('startDate and endDate are required.');
    }

    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    if (isNaN(startDateObj.getTime()) || isNaN(endDateObj.getTime())) {
      throw new BadRequestException('Invalid date format.');
    }

    const task = async () =>
      this.gmailService.fetchAndSaveEmails(subjectFilter, startDate);
    const jobName = 'gmail-job';

    const schedulerDTO: SchedulerDTO = {
      startDate: startDateObj,
      endDate: endDateObj,
      step,
      jobName,
      task,
    };

    this.scheduler.scheduleJob(schedulerDTO);

    return { message: `Scheduled job "${jobName}" with cron expression.` };
  }

  @Get('gmails')
  async getGmails(
    @Query('subjectFilter') subjectFilter: string | null,
    @Query('startDate') startDate: string | null,
  ) {
    try {
      return this.gmailService.fetchAndSaveEmails(subjectFilter, startDate);
    } catch (error) {
      if (error instanceof GaxiosError) {
        throw new HttpException(
          `Gaxios Error: ${error.message}`,
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }
}
