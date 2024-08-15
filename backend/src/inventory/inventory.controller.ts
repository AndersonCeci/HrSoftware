import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateInventoryDto } from './dto/createInventory.dto';
import { InventoryService } from './inventory.service';
import { UpdateInventoryDto } from './dto/updateInventory.dto';
import mongoose from 'mongoose';
import { AssignEmployeeDto } from './dto/assignEmployee.dto';
import { InventoryStatus } from './schemas/Inventory.schema';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post()
  async create(@Body() createInventoryDto: CreateInventoryDto) {
    return this.inventoryService.createInventory(createInventoryDto);
  }

  @Get()
  async findAll() {
    return this.inventoryService.findAll();
  }

  @Get('reserved')
  async findReserved() {
    return this.inventoryService.calculateReservedQuantity();
  }

  @Get('quantity')
  async getAssetQuantities() {
    return this.inventoryService.getAssetQuantities();
  }

  @Delete(':id')
  async deleteByName(@Param('id') id: string) {
    const result = await this.inventoryService.softDeleteAssetById(id);
    return result;
  }

  @Patch('assign/:id')
  async assignToEmployee(
    @Param('id') id: string,
    @Body() assignEmployeeDto: AssignEmployeeDto,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 404);
    return this.inventoryService.assignToEmployee(
      id,
      assignEmployeeDto.employeeID,
      assignEmployeeDto.assignDate,
      assignEmployeeDto.status
    );
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateInventoryDto: UpdateInventoryDto,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 404);
    return this.inventoryService.updateInventory(id, updateInventoryDto);
  }

  @Delete(':id')
  async deleteCode(@Param('id') id:string){
    return this.inventoryService.softDeleteAssetById(id)
  }
}
