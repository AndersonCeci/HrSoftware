import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsDate,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class CreateAssetDto {
  @IsString()
  @IsNotEmpty()
  assetType: string;

  @IsNotEmpty()
  dateGiven: string;
 
  @IsString()
  userName: string;
  

  assetCode?:number

  isDeleted:boolean;
  deleteDate?:Date
}
