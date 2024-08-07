import {
  IsString,
  IsNotEmpty,
 
} from 'class-validator';

export class UpdateAssetDto {
  @IsString()
  @IsNotEmpty()
  assetType: string;
  
  dateGiven?: Date;
 
  @IsString()
  userName: string;
  
  isDeleted:boolean;
  deleteDate?:Date
}
