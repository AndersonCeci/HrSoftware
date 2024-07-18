import { Controller, Get, Post, Body,Param, HttpException,Delete,Patch } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { CreateAssetDto } from './dto/createAsset.dto';
import mongoose from 'mongoose';
import { UpdateAssetDto } from './dto/updateAsset.dto';

@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Post()
  async create(@Body() createAssetDto: CreateAssetDto) {
    return this.assetsService.createAsset(createAssetDto);
  }

  @Get()
  async findAll() {
    return this.assetsService.findAll();
  }

  @Get(':name')
  async findByName(@Param('name') name: string) {
    const findUserAssets = await this.assetsService.findByName(name);
    if (!findUserAssets) throw new HttpException('User not found', 404);
    return findUserAssets;
  }

  @Delete(':name')
  async deleteByName(@Param('name') name: string) {
    const result = await this.assetsService.deleteAssetsByName(name);
    if (result.deletedCount === 0) {
      throw new HttpException('No assets found for the given user', 404);
    }
    return result;
  }

  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() updateAssetDto: UpdateAssetDto) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 404);
    return this.assetsService.updateAsset(id, updateAssetDto);
  }
  
  
}
