// inventory.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { Inventory,InventorySchema } from './schemas/Inventory.schema';
import { AssetsModule } from 'src/assets/assets.module';
import { EmployeeModule } from 'src/employee/employe.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Inventory.name, schema: InventorySchema }]),AssetsModule,EmployeeModule
  ],
  controllers: [InventoryController],
  providers: [InventoryService],

  
})
export class InventoryModule {}
