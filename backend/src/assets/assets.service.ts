import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Asset } from 'src/assets/schemas/asset.schema';
import { CreateAssetDto } from './dto/createAsset.dto';
import { UpdateAssetDto } from './dto/updateAsset.dto';

@Injectable()
export class AssetsService {
  constructor(@InjectModel(Asset.name) private assetModel: Model<Asset>) {}

  async createAsset(createAssetDto: CreateAssetDto): Promise<Asset> {
    const createAsset = new this.assetModel(createAssetDto);
    return createAsset.save();
  }

  async findAll(): Promise<Asset[]> {
    return this.assetModel.find({ isDeleted: false }).exec();
  }

  async findName(name: string): Promise<Asset | null> {
    return await this.assetModel.findOne({assetName:name}).exec();
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

  async updateAsset(id: string, updateAssetDto: UpdateAssetDto): Promise<Asset> {
    return this.assetModel
      .findByIdAndUpdate(id, updateAssetDto, { new: true })
      .exec();
  }
}
