import { IsDateString, IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateInventoryDto {
  @IsOptional()
  assetType?: string;
  
  @IsOptional()
  status?: string;

}
