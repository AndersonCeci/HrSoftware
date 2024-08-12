import { IsString, IsNotEmpty } from 'class-validator';

export class CreateAssetDto {

  assetName:string;

  isDeleted?: boolean;
  deleteDate?: Date;
}
