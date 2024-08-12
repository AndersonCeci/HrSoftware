import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Inventory, InventoryStatus } from './schemas/Inventory.schema';
import { Model, Types } from 'mongoose';
import { CreateInventoryDto } from './dto/createInventory.dto';
import { UpdateInventoryDto } from './dto/updateInventory.dto';
import { AssetsService } from 'src/assets/assets.service';
import { EmployeeService } from 'src/employee/employe.service';


@Injectable()
export class InventoryService {
    constructor(@InjectModel(Inventory.name) private inventoryModel: Model<Inventory>,
    private readonly assetsService: AssetsService,
    private readonly employeeService: EmployeeService,
 ) {}
    
 async createInventory(createInventoryDto: CreateInventoryDto): Promise<Inventory[]> {
  const foundAsset = await this.assetsService.findName(createInventoryDto.assetName);
  const foundEmployee = await this.employeeService.findName(createInventoryDto.employeeName)

  if (!foundAsset) {
    throw new NotFoundException(`AssetType with name ${createInventoryDto.assetName} not found`);
  }

  if (!foundEmployee) {
    throw new NotFoundException(`Employee with name ${createInventoryDto.employeeName} not found`);
  }

  const { assetCodes, status, isDeleted = false, deleteDate } = createInventoryDto;

  const inventoryEntries = assetCodes.map(code => ({
    assetID: foundAsset._id,
    employeeID: foundEmployee._id,
    assetCodes: code,
    status:createInventoryDto.status,
    isDeleted,
    deleteDate
  }));

  return this.inventoryModel.create(inventoryEntries);
}

  async findAll(): Promise<any> {
    return this.inventoryModel
  .find({ isDeleted: false })
  .populate('assetID')
  .populate('employeeID')
  .exec();
  }
  async updateStatus(id: string, status: string): Promise<Inventory> {
    return this.inventoryModel.findByIdAndUpdate(id, { status }, { new: true }).exec();
  }

  async getAssetQuantities(): Promise<any> {
    return this.inventoryModel.aggregate([
      { $match: { isDeleted: false } },  
      { $group: { _id: '$assetID', quantity: { $sum: 1 } } },  
      { $lookup: { from: 'assets', localField: '_id', foreignField: '_id', as: 'assetDetails' } }, 
      { $unwind: '$assetDetails' },  
      { $project: { _id: 0, assetID: '$_id', assetName: '$assetDetails.assetName', quantity: 1 } }  
    ]).exec();
  }

  async findAvailableAsset(type: string): Promise<Inventory | null> {
    return this.inventoryModel.findOne({
      isDeleted: false,
      assetType: type,
      isReserved: false
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
  

   async updateInventory(id: string, updateAssetDto: UpdateInventoryDto): Promise<Inventory> {
    return this.inventoryModel.findByIdAndUpdate(id, updateAssetDto, { new: true }).exec();
  }
}
