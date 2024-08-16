import {ArrayNotEmpty, IsArray, IsBoolean, IsEnum, IsOptional, IsString} from 'class-validator';
import { InventoryStatus } from '../schemas/inventory.schema';

export class UpdateInventoryDto {
  @IsOptional()
  @IsString()
  assetName?:string

  @IsOptional()
  @IsString()
  assetCodes?: string;

  @IsEnum(InventoryStatus)
  @IsOptional()
  status?: InventoryStatus;

}
