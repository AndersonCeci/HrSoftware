import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Asset } from 'src/assets/schemas/Asset.schema';
import { CreateAssetDto } from './dto/createAsset.dto';
import { UpdateAssetDto } from './dto/updateAsset.dto';
import { InventoryService } from 'src/inventory/inventory.service';
import { Inventory } from 'src/inventory/schemas/Inventory.schema';



@Injectable()
export class AssetsService {
  constructor(@InjectModel(Asset.name) private assetModel: Model<Asset>,
  private readonly inventoryService: InventoryService) {}

   async createAsset(createAssetDto: CreateAssetDto): Promise<Asset> {
     const availableAsset = await this.inventoryService.findAvailableAsset(createAssetDto.assetType);
     if (!availableAsset) {
       throw new Error('No available asset of this type.');
     }

     const createdAsset = new this.assetModel({
       ...createAssetDto,
       assetCode: availableAsset.assetCode,
     });

     await this.inventoryService.updateAssetStatus(availableAsset._id.toString(), 'Reserved');
     return createdAsset.save();
   }
  

  async findAll(): Promise<Asset[]> {
    return this.assetModel.find({ isDeleted: false }).exec();
  }

  // type(type:string): Promise<Inventory[]> {
  //       return this.inventoryService.type(type)
  //  }
  
  async findByName(name: string): Promise<Asset[]> {
    return this.assetModel.find({ userName: name }).exec();
  }

  async softDeleteAssetById(id: string): Promise<Asset> {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    return this.assetModel
      .findByIdAndUpdate(
        id,
        { isDeleted: true, deleteDate: currentDate },
        { new: true },
      )
      .exec();
  }
 
  

  async updateAsset(
    id: string,
    updateAssetDto: UpdateAssetDto,
  ): Promise<Asset> {
    return this.assetModel
      .findByIdAndUpdate(id, updateAssetDto, { new: true })
      .exec();
  }
}