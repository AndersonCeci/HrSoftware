import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob, CronTime } from 'cron';
import { CronService } from './cron/cron.service';
import { SchedulerDTO } from './schedulerDTO/scheduler.dto';

@Injectable()
export class SchedulerService implements OnModuleInit {
  private readonly logger = new Logger(SchedulerService.name);

  constructor(
    private readonly scheduleRegistry: SchedulerRegistry,
    private readonly cronService: CronService,
  ) {}
  onModuleInit() {
    console.log(' SchedulerService to be implemented');
  }

  scheduleJob(dto: SchedulerDTO): void {
    const cronExpression = this.cronService.getCronExpression(
      dto.startDate,
      dto.step,
    );
    const job = new CronJob(cronExpression, () => {
      const currentDate = new Date();
      if (currentDate >= dto.startDate && currentDate <= dto.endDate) {
        dto.task;
      }
    });

    this.scheduleRegistry.addCronJob(dto.jobName, job);

    ``;
    job.start();
    this.logger.log(
      `Job ${dto.jobName} started with cron expression "${cronExpression}".`,
    );
  }

  stopJob(jobName: string): void {
    const job = this.scheduleRegistry.getCronJob(jobName);
    if (job) {
      job.stop();
      this.logger.log(`Job ${jobName} stopped.`);
    }
  }

  rescheduleJob(jobName: string, newCronExpression: string): void {
    const job = this.scheduleRegistry.getCronJob(jobName);
    if (job) {
      job.setTime(new CronTime(newCronExpression));
      job.start();
      this.logger.log(
        `Job ${jobName} rescheduled with new cron expression "${newCronExpression}".`,
      );
    }
  }

  getJob(jobName: string): CronJob {
    return this.scheduleRegistry.getCronJob(jobName);
  }

  getAllJobs(): any[] {
    const jobsMap = this.scheduleRegistry.getCronJobs();
    return Array.from(jobsMap.values()).map((job) => ({
      cronTime: job.cronTime.source,
      nextInvocation: job.nextDates().toString(),
      lastExecution: job.lastDate().toString(),
      running: job.running,
    }));
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
