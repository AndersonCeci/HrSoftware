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
  locationName?: string;

  @IsOptional()
  longtitude?: string;

  @IsOptional()
  latitude?: string;

  @IsOptional()
  images?: string[];

  isDeleted: boolean;
  deleteDate?: Date;
}
