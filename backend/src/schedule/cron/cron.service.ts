import { Injectable } from '@nestjs/common';
import { isValidCron } from 'cron-validator';

@Injectable()
export class CronService {
  getCronExpression(startDate: Date, step: string): string {
    let cronExpression = '*/1 * * * *';

    if (/^\d{1,2}(m|h|d|w)$/.test(step)) {
      const [value, unit] = [parseInt(step.slice(0, -1)), step.slice(-1)];

      switch (unit) {
        case 'm':
          cronExpression = `*/${value} * * * *`;
          break;
        case 'h':
          cronExpression = `0 */${value} * * *`;
          break;
        case 'd':
          cronExpression = `0 0 */${value} * *`;
          break;
        case 'w':
          cronExpression = `0 0 * * ${value}`;
          break;
        default:
          throw new Error('Invalid step unit.');
      }
    } else {
      throw new Error('Invalid step format.');
    }

    if (!isValidCron(cronExpression)) {
      throw new Error('Generated cron expression is invalid.');
    }

    return cronExpression;
  }
}
