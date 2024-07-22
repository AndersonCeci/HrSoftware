import { IsString, IsOptional, IsDateString, IsNotEmpty } from 'class-validator';
import { Status } from '../schema/events.schema';

export class CreateEventDto {
    @IsString()
    title: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsDateString()
    startDate: Date;

    @IsDateString()
    @IsOptional()
    endDate?: Date;

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

    @IsNotEmpty()
    creatorId: string;
}
