import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsOptional,
  isString,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateNotificationDto {
  @IsString()
  @IsNotEmpty()
  message: string;

  @IsBoolean()
  @IsOptional()
  isRead?: boolean;

  userId: Types.ObjectId;


  path: string;
}
