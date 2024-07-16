import { IsOptional } from "class-validator";

export class UpdateEventDto {

    @IsOptional()
    title: string;

    @IsOptional()
    description: string;

    @IsOptional()
    startDate: Date;

    @IsOptional()
    endDate: Date;

    @IsOptional()
    startTime: Date;

    @IsOptional()
    endTime: Date;

    @IsOptional()
    location: string;

    @IsOptional()
    progress: string;
    
    @IsOptional()
    status: string;

    @IsOptional()
    createdAt: Date;

    @IsOptional()
    updatedAt: Date;

    @IsOptional()
    locationId: string;
}