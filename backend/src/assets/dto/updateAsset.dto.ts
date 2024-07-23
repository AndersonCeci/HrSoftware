import { IsDateString, IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateAssetDto {
  @IsOptional()
  assetType?: string;

  @IsOptional()
  dateGiven?: string;

  @IsString()
  @IsOptional()
  userName?: string;
}
