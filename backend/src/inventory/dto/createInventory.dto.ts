import {
    IsString,
    IsNumber,
    IsNotEmpty,
  } from 'class-validator';
  
  export class CreateInventoryDto {
    @IsString()
    @IsNotEmpty()
    assetType: string;
    
    @IsNumber({}, { message: 'Asset Code must be a number' })
    assetCode: number;

    
    count: number;
    
    isDeleted:boolean;
    deleteDate?:Date
  }