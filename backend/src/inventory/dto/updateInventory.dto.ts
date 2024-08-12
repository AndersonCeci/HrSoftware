import {ArrayNotEmpty, IsArray, IsBoolean, IsEnum, IsOptional, IsString} from 'class-validator';
import { InventoryStatus } from '../schemas/inventory.schema';

export class UpdateInventoryDto {
  @IsOptional()
  @IsString()
  assetType?: string;

  @IsOptional()
  @IsString({ each: true })
  assetCodes?: string;

  @IsEnum(InventoryStatus)
  @IsOptional()
  status?: InventoryStatus;

  // @IsOptional()
  // quantity?: number;

  @IsBoolean()
  @IsOptional()
  isDeleted?: boolean;

  @IsOptional()
  deleteDate?: Date;

}
