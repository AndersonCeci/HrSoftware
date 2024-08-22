import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  eventName: string;

  @IsString()
  @IsOptional()
  eventDescription?: string;

  @IsDateString()
  eventDate: Date;

  @IsDateString()
  @IsOptional()
  eventEndDate: Date;

  eventStartTime: string;

  eventEndTime: string;

  @IsOptional()
  location?: string;

  @IsOptional()
  image?: string[];

  isDeleted: boolean;
  deleteDate?: Date;
}
