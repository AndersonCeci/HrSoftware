import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Asset, AssetSchema } from 'src/assets/schemas/Asset.schema';
import { AssetsService } from './assets.service';
import { AssetsController } from './assets.controller';
import { InventoryModule } from 'src/inventory/inventory.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Asset.name, schema: AssetSchema }]),
    InventoryModule
  ],
  providers: [AssetsService],
  controllers: [AssetsController],
})
export class AssetsModule {}
