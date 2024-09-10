import { Type } from 'class-transformer';
import { IsArray, IsMongoId, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class AssignEmployeeDto {
  joinEmployee: string;

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  eventParticipants?: Types.ObjectId[];
}
