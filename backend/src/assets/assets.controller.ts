import { Controller, Get, Post, Body, Param, HttpException, Delete, Patch } from '@nestjs/common';
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
  async findById(@Param('name') name: string) {
    return this.assetsService.findName(name);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateAssetDto: UpdateAssetDto,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 404);
    return this.assetsService.updateAsset(id, updateAssetDto);
  }

  @Delete(':id')
  async deleteCode(@Param('id') id: string) {
    return this.assetsService.softDeleteAssetById(id);
  }
}
