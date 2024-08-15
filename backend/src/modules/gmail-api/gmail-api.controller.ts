import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Query,
} from '@nestjs/common';
import { GmailApiService } from './gmail-api.service';
import { Roles } from 'src/decorators/role.decorator';
import { SchedulerDTO } from 'src/schedule/schedulerDTO/scheduler.dto';
import { SchedulerService } from 'src/schedule/scheduler.service';

@Roles(['hr', 'ceo'])
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
}
