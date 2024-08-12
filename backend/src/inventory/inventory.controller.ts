import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post } from '@nestjs/common';
import { CreateInventoryDto } from './dto/createInventory.dto';
import { InventoryService } from './inventory.service';
import { UpdateInventoryDto } from './dto/updateInventory.dto';
import mongoose from 'mongoose';
import { Inventory } from './schemas/Inventory.schema';

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

   @Patch(':id/:status')
   async updateAssetStatus(@Param('id') id: string,@Param('status') status:string){
     return this.inventoryService.updateStatus(id,status)
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

  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() updateInventoryDto: UpdateInventoryDto) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 404);
    return this.inventoryService.updateInventory(id, updateInventoryDto);
  }
}
