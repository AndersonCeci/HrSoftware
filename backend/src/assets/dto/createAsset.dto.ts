import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';

export class CreateAssetDto {
  assetName: string;

  quantity?: number;

  @IsBoolean()
  @IsOptional()
  isDeleted?: boolean;

  @IsOptional()
  deleteDate?: Date;
}
