import {
  IsString,
  IsNotEmpty,
 
} from 'class-validator';

export class UpdateAssetDto {
  @IsString()

  assetType?: string;

}

