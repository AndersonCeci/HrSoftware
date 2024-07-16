import { IsString, IsDate, IsOptional, IsDateString } from 'class-validator';

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
}
