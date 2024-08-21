import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsBoolean,
  IsOptional,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';
import { InventoryStatus } from '../schemas/Inventory.schema';

export class CreateInventoryDto {
  assetName: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  assetCodes: string[];

  @IsEnum(InventoryStatus)
  @IsOptional()
  status?: InventoryStatus;

  //employeeName:string

  //  @IsOptional()
  //  quantity?: number;

  @IsBoolean()
  @IsOptional()
  isDeleted?: boolean;

  @IsOptional()
  deleteDate?: Date;
}
