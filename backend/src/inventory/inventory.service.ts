import {
  ConflictException,
  ConsoleLogger,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Inventory, InventoryStatus } from './schemas/Inventory.schema';
import mongoose, { Model, Types } from 'mongoose';
import { CreateInventoryDto } from './dto/createInventory.dto';
import { UpdateInventoryDto } from './dto/updateInventory.dto';
import { AssetsService } from 'src/assets/assets.service';
import { EmployeeService } from 'src/employee/employe.service';
import { Employee } from 'src/employee/schema/employe.schema';

@Injectable()
export class InventoryService {
  constructor(
    @InjectModel(Inventory.name) private inventoryModel: Model<Inventory>,
    @InjectModel(Employee.name) private employeeModel: Model<Employee>,
    private readonly assetsService: AssetsService,
    private readonly employeeService: EmployeeService,
  ) {}

  async createInventory(
    createInventoryDto: CreateInventoryDto,
  ): Promise<Inventory[]> {
    const foundAsset = await this.assetsService.findName(
      createInventoryDto.assetName,
    );

    if (!foundAsset) {
      throw new NotFoundException();
    }

    const {
      assetCodes,
      status = InventoryStatus.Available,
      isDeleted = false,
      deleteDate,
    } = createInventoryDto;

    const inventoryEntries = assetCodes.map((code) => ({
      assetID: foundAsset._id,
      assetCodes: code,
      status,
      isDeleted,
      deleteDate,
    }));

    const createdInventories =
      await this.inventoryModel.create(inventoryEntries);

    return this.inventoryModel
      .find({ _id: { $in: createdInventories.map((item) => item._id) } })
      .populate('assetID')
      .exec();
  }

  async assignToEmployee(
    inventoryID: string,
    employeeID: string,
    assignDate: string,
    status: InventoryStatus,
  ): Promise<Inventory> {
    const foundEmployee = await this.employeeModel.findById(employeeID);

    if (!foundEmployee) {
      throw new NotFoundException(`Employee with ID ${employeeID} not found`);
    }

    await this.inventoryModel.findByIdAndUpdate(inventoryID, {
      employeeID: foundEmployee._id,
      assignDate: new Date(assignDate),
      status: InventoryStatus.Assigned,
    });

    // Use populate to return the employee details instead of just the ID
    return await this.inventoryModel
      .findById(inventoryID)
      .populate('employeeID');
  }

  async unassignFromEmployee(inventoryID: string): Promise<Inventory> {
    const foundInventory = await this.inventoryModel.findById(inventoryID);

    if (!foundInventory) {
      throw new NotFoundException(
        `Inventory item with ID ${inventoryID} not found`,
      );
    }

    foundInventory.employeeID = null; 
    foundInventory.status = InventoryStatus.Available; 
    foundInventory.assignDate = null; 

    await foundInventory.save();
    return foundInventory;
  }

  async findAll(): Promise<any> {
    return this.assetsService.findAll();
  }

  async getAssetQuantities(): Promise<any> {
    return this.inventoryModel
      .aggregate([
        { $match: { isDeleted: false } },
        { $group: { _id: '$assetID', quantity: { $sum: 1 } } },
        {
          $lookup: {
            from: 'assets',
            localField: '_id',
            foreignField: '_id',
            as: 'assetDetails',
          },
        },
        { $unwind: '$assetDetails' },
        {
          $project: {
            _id: 0,
            assetID: '$_id',
            assetName: '$assetDetails.assetName',
            quantity: 1,
          },
        },
      ])
      .exec();
  }

  async calculateReservedQuantity(): Promise<any> {
    return this.inventoryModel
      .aggregate([
        { $match: { status: InventoryStatus.Assigned } },

        {
          $group: {
            _id: '$assetID',
            reservedQuantity: { $sum: 1 },
          },
        },

        {
          $lookup: {
            from: 'assets',
            localField: '_id',
            foreignField: '_id',
            as: 'assetDetails',
          },
        },

        { $unwind: '$assetDetails' },

        {
          $project: {
            _id: 0,
            assetID: '$_id',
            assetName: '$assetDetails.assetName',
            reservedQuantity: 1,
          },
        },
      ])
      .exec();
  }

  async delete(id: string): Promise<Inventory> {
    const deletedInventory = await this.inventoryModel.findByIdAndDelete(id);

    if (!deletedInventory) {
      throw new NotFoundException(`Inventory item with ID ${id} not found`);
    }

    return deletedInventory;
  }

  async softDeleteAssetById(id: string): Promise<Inventory> {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    return this.inventoryModel
      .findByIdAndUpdate(
        id,
        { isDeleted: true, deleteDate: currentDate },
        { new: true },
      )
      .exec();
  }

  async updateInventory(
    id: string,
    updateInventoryDto: UpdateInventoryDto,
  ): Promise<Inventory> {
    return this.inventoryModel
      .findByIdAndUpdate(id, updateInventoryDto, { new: true })
      .exec();
  }
}
