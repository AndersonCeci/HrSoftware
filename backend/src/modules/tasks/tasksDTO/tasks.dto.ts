import { IsNotEmpty } from 'class-validator';
import { ReminderStatus } from '../schema/tasks.schema';

export class CreateReminderDto {
  @IsNotEmpty()
  reminderTitle: string;

  @IsNotEmpty()
  due_date: Date;

  @IsNotEmpty()
  status: ReminderStatus;

  isDeleted: boolean;
  deleteDate: Date;
}
