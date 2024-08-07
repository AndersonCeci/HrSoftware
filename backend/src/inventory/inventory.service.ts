import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Inventory } from './schemas/Inventory.schema';
import { Model } from 'mongoose';
import { CreateInventoryDto } from './dto/createInventory.dto';
import { UpdateInventoryDto } from './dto/updateInventory.dto';

@Injectable()
export class InventoryService {
    constructor(@InjectModel(Inventory.name) private inventoryModel: Model<Inventory>) {}

  async createInventory(createInventoryDto: CreateInventoryDto): Promise<Inventory> {
    const createdInventory = new this.inventoryModel(createInventoryDto);
    return createdInventory.save();
  }

  async findAll(): Promise<Inventory[]> {
    return this.inventoryModel.find({isDeleted:false}).exec();
  }

  async getAssetCounts(): Promise<Inventory[]> {
    return this.inventoryModel.aggregate([
      { $match: { isDeleted: false } },
      { $group: { _id: '$assetType', count: { $sum: 1 } } },
      { $project: { assetType: '$_id', count: 1, _id: 0 } }
    ]).exec();
  }

  // async filter(): Promise<Inventory[]> {
  //   return this.inventoryModel.aggregate([
  //     { $match: { assetType:"Monitor" } },
  //   ]).exec();
  // }

  async findAvailableAsset(type: string): Promise<Inventory | null> {
    return this.inventoryModel.findOne({
      isDeleted: false,
      assetType: type,
      status: 'Not Reserved'
    }).exec();
  }

  async softDeleteAssetById(id: string): Promise<Inventory> {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  
  return this.inventoryModel.findByIdAndUpdate(
    id, 
    { isDeleted: true, deleteDate: currentDate }, 
    { new: true }
  ).exec();
}
  async updateAssetStatus(id: string, status: string): Promise<Inventory> {
    return this.inventoryModel.findByIdAndUpdate(id, { status }, { new: true }).exec();
  }

   async updateInventory(id: string, updateAssetDto: UpdateInventoryDto): Promise<Inventory> {
    return this.inventoryModel.findByIdAndUpdate(id, updateAssetDto, { new: true }).exec();
  }
}
