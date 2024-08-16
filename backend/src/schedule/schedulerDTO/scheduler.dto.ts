export class SchedulerDTO {
  readonly startDate: Date;
  readonly endDate: Date;
  readonly step: string;
  readonly jobName?: string;
  readonly task?: () => void;
}
