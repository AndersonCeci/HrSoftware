import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SalaryService } from './salary.service'; 

@Injectable()
export class ScheduleService {
  private readonly logger = new Logger(ScheduleService.name);

  constructor(private readonly salaryService: SalaryService) {}

  // @Cron(CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_MIDNIGHT) 
  // async handleCron() {
  //   this.logger.debug('Clearing bonuses for testing');
  //   await this.salaryService.clearBonuses();
  // }
}
