import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Asset } from 'src/assets/schemas/Asset.schema';
import { CreateAssetDto } from './dto/createAsset.dto';
import { UpdateAssetDto } from './dto/updateAsset.dto';
import { Query } from 'express-serve-static-core';

@Injectable()
export class AssetsService {
  constructor(@InjectModel(Asset.name) private assetModel: Model<Asset>) {}

  async createAsset(createAssetDto: CreateAssetDto): Promise<Asset[]> {
    const { assetName, isDeleted = false, deleteDate } = createAssetDto;

    const inventoryEntries = assetName.map((code) => ({
      assetName: code,
      isDeleted,
      deleteDate,
    }));
    Logger.log('create');

    return await this.assetModel.create(inventoryEntries);
  }

  async findAll(): Promise<Asset[]> {
   
    const data = await this.assetModel
      .aggregate([
        {
          $lookup: {
            from: 'inventories',
            localField: '_id',
            foreignField: 'assetID',
            as: 'inventories',
          },
        },
        {
          $unwind: {
            path: '$inventories',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: 'employees',
            localField: 'inventories.employeeDetails',
            foreignField: '_id',
            as: 'inventories.employeeDetails',
          },
        },
        {
          $unwind: {
            path: '$inventories.employeeDetails',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $group: {
            _id: '$_id',
            assetName: { $first: '$assetName' },
            quantity: { $sum: 1 },
            inventories: { $push: '$inventories' },
            reserved: {
              $sum: {
                $cond: [{ $eq: ['$inventories.status', 'Assigned'] }, 1, 0],
              },
            },
            onRepair: {
              $sum: {
                $cond: [{ $eq: ['$inventories.status', 'OnRepair'] }, 1, 0],
              },
            },
          },
        },
        {
          $sort: { assetName: 1 },
        },
      ])
      .exec();
    return data;
  }

  async findAllEmployee(): Promise<Asset[]> {
    const data = await this.assetModel
      .aggregate([
        {
          $lookup: {
            from: 'inventories',
            localField: '_id',
            foreignField: 'assetID',
            as: 'inventories',
          },
        },
        {
          $unwind: {
            path: '$inventories',
            preserveNullAndEmptyArrays: false,
          },
        },
        {
          $lookup: {
            from: 'employees',
            localField: 'inventories.employeeDetails',
            foreignField: '_id',
            as: 'inventories.employeeDetails',
          },
        },
        {
          $unwind: {
            path: '$inventories.employeeDetails',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $match: {
            'inventories.status': 'Assigned', 
          },
        },
        {
          $project: {
            _id: 0,
            assetName: 1,
            inventory: '$inventories', 
          },
        },
        {
          $sort: { assetName: 1 },
        },
      ])
      .exec();
    return data;
  }

  async findName(name: string): Promise<Asset | null> {
    return await this.assetModel.findOne({ assetName: name }).exec();
  }

  async updateAsset(
    id: string,
    updateAssetDto: UpdateAssetDto,
  ): Promise<Asset> {
    return this.assetModel
      .findByIdAndUpdate(id, updateAssetDto, { new: true })
      .exec();
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
}
        // {
        //   $skip: resPerPage * page,
        // },
        // {
        //   $limit: resPerPage,
        // },