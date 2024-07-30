import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Asset } from 'src/assets/schemas/Asset.schema';
import { CreateAssetDto } from './dto/createAsset.dto';
import { UpdateAssetDto } from './dto/updateAsset.dto';

function generateUniqueNumericCode(): string {
  const code = Math.floor(Math.random() * 1000000); // Generates a random number between 0 and 999999
  return code.toString();
}

@Injectable()
export class AssetsService {
  constructor(@InjectModel(Asset.name) private assetModel: Model<Asset>) {}

  async createAsset(createAssetDto: CreateAssetDto): Promise<Asset> {
    createAssetDto.assetCode = generateUniqueNumericCode();
    const createdAsset = new this.assetModel(createAssetDto);
    return createdAsset.save();
  }

  async findAll(): Promise<Asset[]> {
    return this.assetModel.find().exec();
  }

  async findByName(name: string): Promise<Asset[]> {
    return this.assetModel.find({ userName: name }).exec();
  }

  async deleteAssetsById(id: string): Promise<{ deletedCount?: number }> {
    const result = await this.assetModel.deleteMany({ _id: id }).exec();
    return { deletedCount: result.deletedCount };
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
