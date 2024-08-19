import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';

export class CreateAssetDto {
  assetName: string;

  quantity?: number;
  reserved?: number;

  @IsBoolean()
  @IsOptional()
  isDeleted?: boolean;

  @IsOptional()
  deleteDate?: Date;
}
