import { IsString,IsNumber, IsNotEmpty, IsDate, IsOptional,IsDateString } from 'class-validator';

export class CreateAssetDto {
  @IsString()
  @IsNotEmpty()
   assetType: string;

  
   assetCode: string;

  
  
  @IsNotEmpty()
   dateGiven: string;

  
   @IsOptional()
   @IsString()
   userName?: string;
}
