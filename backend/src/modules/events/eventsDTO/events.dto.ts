import { IsString, IsDate, IsOptional, IsDateString } from 'class-validator';
import { Status } from '../schema/events.schema';

export class CreateEventDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsDateString()
    startDate: Date;

    @IsDateString()
    endDate: Date;

    @IsOptional()
    @IsDateString()
    startTime?: Date;

    @IsOptional()
    @IsDateString()
    endTime?: Date;

    @IsOptional()
    @IsString()
    location?: string;

    status: Status;
}
