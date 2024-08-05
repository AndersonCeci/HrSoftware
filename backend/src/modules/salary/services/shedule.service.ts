import { Injectable, Logger } from '@nestjs/common';
import { SalaryService } from './salary.service';
import { Cron } from '@nestjs/schedule/dist/decorators/cron.decorator';
import { CronExpression } from '@nestjs/schedule/dist/enums/cron-expression.enum';

@Injectable()
export class ScheduleService {
  private readonly logger = new Logger(ScheduleService.name);

  constructor(private readonly salaryService: SalaryService) {}

  // @Cron(CronExpression.EVERY_5_MINUTES)
  async handleCron() {
    this.logger.debug('Clearing bonuses for testing');
    await this.salaryService.createSalariesPerMonth();
  }
}
