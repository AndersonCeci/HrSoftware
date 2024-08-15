import { Module } from '@nestjs/common';
import { ScheduleModule as NestScheduleModule } from '@nestjs/schedule';
import { CronService } from './cron/cron.service';
import { SchedulerService } from './scheduler.service';
import { SchedulerController } from './scheduler.controller';

@Module({
  imports: [NestScheduleModule.forRoot()],
  providers: [CronService, SchedulerService],
  exports: [SchedulerService],
  controllers: [SchedulerController],
})
export class SchedulerModule {}
