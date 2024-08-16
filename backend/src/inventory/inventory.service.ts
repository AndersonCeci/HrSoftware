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
      employeeID: null,
      assignDate: null,
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
    employeeDetails: string,
    assignDate: string,
    status: InventoryStatus,
  ): Promise<Inventory> {
    const foundEmployee = await this.employeeModel.findById(employeeDetails);

    if (!foundEmployee) {
      throw new NotFoundException(
        `Employee with ID ${employeeDetails} not found`,
      );
    }

    await this.inventoryModel.findByIdAndUpdate(inventoryID, {
      employeeDetails: foundEmployee._id,
      assignDate: new Date(assignDate),
      status: InventoryStatus.Assigned,
    });

    const updatedInventory = await this.inventoryModel
      .findById(inventoryID)
      .populate('employeeDetails');

    const response = {
      ...updatedInventory.toObject(),
      employeeDetails: [updatedInventory.employeeDetails],
    };

    return response as unknown as Inventory;
  }

  // async unassignFromEmployee(inventoryID: string): Promise<Inventory> {
  //   const foundInventory = await this.inventoryModel.findById(inventoryID);

  //   if (!foundInventory) {
  //     throw new NotFoundException(
  //       `Inventory item with ID ${inventoryID} not found`,
  //     );
  //   }

  //   foundInventory.employeeID = null;
  //   foundInventory.status = InventoryStatus.Available;
  //   foundInventory.assignDate = null;

  //   const updatedInventory = await foundInventory.save();
  //   const response = {
  //     ...updatedInventory.toObject(),
  //     employeeID: [updatedInventory.employeeID],
  //   };
  //  return response as unknown as Inventory;
  // }

  async findAll(): Promise<any> {
    return this.assetsService.findAll();
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
