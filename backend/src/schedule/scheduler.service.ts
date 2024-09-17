import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob, CronTime } from 'cron';
import { CronService } from './cron/cron.service';
import { SchedulerDTO } from './schedulerDTO/scheduler.dto';

@Injectable()
export class SchedulerService implements OnModuleInit {
  private readonly logger = new Logger(SchedulerService.name);

  constructor(
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly cronService: CronService,
  ) {}
  onModuleInit() {
    console.log(' SchedulerService to be implemented');
  }

  scheduleJob(dto: SchedulerDTO): void {
    try {
      const cronExpression = this.cronService.getCronExpression(
        dto.startDate,
        dto.step,
      );
      const job = new CronJob(cronExpression, () => {
        const currentDate = new Date();
        if (currentDate >= dto.startDate && currentDate <= dto.endDate) {
          if (typeof dto.task === 'function') {
            dto.task();
          } else {
            this.logger.warn(`Task for job ${dto.jobName} is not a function.`);
          }
        }
      });

      this.schedulerRegistry.addCronJob(dto.jobName, job);
      job.start();
      this.logger.log(
        `Job ${dto.jobName} started with cron expression "${cronExpression}".`,
      );
    } catch (error) {
      this.logger.error(`Failed to schedule job ${dto.jobName}`, error.stack);
    }
  }
  stopJob(jobName: string): void {
    try {
      const job = this.schedulerRegistry.getCronJob(jobName);
      job.stop();
      this.logger.log(`Job ${jobName} stopped.`);
    } catch (error) {
      this.logger.error(`Failed to stop job ${jobName}`, error.stack);
    }
  }

  rescheduleJob(jobName: string, newCronExpression: string): void {
    try {
      const job = this.schedulerRegistry.getCronJob(jobName);
      job.setTime(new CronTime(newCronExpression));
      job.start();
      this.logger.log(
        `Job ${jobName} rescheduled with new cron expression "${newCronExpression}".`,
      );
    } catch (error) {
      this.logger.error(`Failed to reschedule job ${jobName}`, error.stack);
    }
  }

  getJob(jobName: string): CronJob | null {
    try {
      return this.schedulerRegistry.getCronJob(jobName);
    } catch (error) {
      this.logger.error(`Job ${jobName} not found`, error.stack);
      return null;
    }
  }

  getCrons() {
    const jobs = this.schedulerRegistry.getCronJobs();
    jobs.forEach((value, key, map) => {
      let next: string | Date;
      this.logger.log(`value:${value}`);
      try {
        next = value.nextDate().toJSDate();
      } catch (e) {
        next = 'error: next fire date is in the past!';
      }
      this.logger.log(`job: ${key} -> next: ${next}`);
    });
  }
  devLog(): void {
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
    };
    console.log(
      'Scheduler function executed at ' +
        new Date().toLocaleTimeString([], options),
    );
  }
}
