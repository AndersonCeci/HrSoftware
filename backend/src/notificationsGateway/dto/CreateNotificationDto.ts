import { IsNotEmpty, IsString, IsBoolean, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class CreateNotificationDto {
  @IsString()
  @IsNotEmpty()
  message: string;


  @IsBoolean()
  @IsOptional()
  isRead?: boolean;
}
