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

  eventStartTime: string;

  eventEndTime: string;

  @IsOptional()
  locationName?: string;

  @IsOptional()
  longtitude?: string;

  @IsOptional()
  latitude?: string;

  @IsOptional()
  image?: string;

  isDeleted: boolean;
  deleteDate?: Date;
}
